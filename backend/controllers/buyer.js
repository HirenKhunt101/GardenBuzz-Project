const mongoose = require("mongoose");
const schema = require("./../database/database.schema");
const mongo = require("./../database/database.service");
const nodemailer = require("nodemailer");
const { promises } = require("nodemailer/lib/xoauth2");
const ProductDetail = schema.product_detail;
const CartDetail = schema.cart_detail;

let add_product_in_cart = async function (req, res) {
  let body = req.body.product;
  let UserId = req.body.UserId
  try {
    const CartDetailObj = new CartDetail({
      ProductId: body._id,
      Quantity: 1,
      PotColor: body.PotColor,
      UserId: UserId,
    });
    await CartDetailObj.save();
    res.json({ message: "Product added Successfully", status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let remove_product_from_cart = async function (req, res) {
  let body = req.body;
  try {
    await CartDetail.deleteOne({ ProductId: body.ProductId });
    res.json({ message: "Product Removed Successfully", status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let get_cart_details = async function (req, res) {
  let body = req.body;
  try {

    if(body.UserId) {
      body.UserId = new mongoose.Types.ObjectId(body.UserId);
    }

    let response = await CartDetail.aggregate([
      {
        $match: {
          UserId: body.UserId,
        },
      },
      {
        $lookup: {
          from: "product_details",
          localField: "ProductId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          _id: "$result._id",
          Name: "$result.Name",
          Price: "$result.Price",
          ImageURL: "$result.ImageURL",
          ProductId: 1,
          ProductQuantity: "$Quantity",
          PotColor: 1,
        },
      },
    ]);
    res.json({
      data: response,
      message: "Successfully Read Details!",
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let update_cart_product_quantity = async function (req, res) {
  let body = req.body;
  try {
    await CartDetail.updateOne(
      { ProductId: body.ProductId },
      { Quantity: body.Quantity }
    );
    res.json({
      message: "Product Quantity Updated Successfully",
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let place_order = async function (req, res) {
  let body = req.body;
  try {
    await CartDetail.deleteMany(
      { UserId: body.UserId }
    );
    res.json({
      message: "Your order placed successfully",
      status: "ok",
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let read_product_detail = async function (req, res) {
  let body = req.body;
  let data = {};

  try {
    // data.product_detail = await ProductDetail.findById(body.ProductId);
    // data.cart_detail = await CartDetail.findOne({
    //   UserId: body.UserId,
    //   ProductId: body.ProductId
    // })
    if(body.UserId) {
      let [product_detail, cart_detail] = await Promise.all([
        ProductDetail.findById(body.ProductId),
        CartDetail.findOne({
          UserId: body.UserId,
          ProductId: body.ProductId
        })
      ])
      data.product_detail = product_detail;
      data.cart_detail = cart_detail;
    }
    else {
      let [product_detail] = await Promise.all([
        ProductDetail.findById(body.ProductId),
      ])
      data.product_detail = product_detail;
    }

    res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};


module.exports = {
  add_product_in_cart: add_product_in_cart,
  remove_product_from_cart: remove_product_from_cart,
  get_cart_details: get_cart_details,
  update_cart_product_quantity: update_cart_product_quantity,
  place_order: place_order,
  read_product_detail: read_product_detail
};
