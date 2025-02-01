const mongoose = require("mongoose");
const schema = require("./../database/database.schema");
const mongo = require("./../database/database.service");
const nodemailer = require("nodemailer");
const multer = require('multer');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const UserDetail = schema.user_detail;
const ProductDetail = schema.product_detail;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const client = new vision.ImageAnnotatorClient();

let user_registration = async function (req, res) {
  let body = req.body;
  try {
    let findUserDetails = await UserDetail.find({ Email: body.email });
    if (findUserDetails.length > 0) {
      return res.json({ message: "User is already Exist", status: 'failed' });
    }

    const UserDetailObj = new UserDetail({
      NurseryName: body.nurseryname,
      Email: body.email,
      Username: body.username,
      Password: body.password,
      ContactNumber: body.contactnumber,
      Pincode: body.pincode,
      Address: body.address
    });
    await UserDetailObj.save();
    res.json({ message: "User Registered Successfully", status: 'ok' });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let login_verify = async function (req, res) {
  let body = req.body;
  try {
    const data = await UserDetail.find({
      Email: body.email,
      Password: body.password,
    });
    console.log(data);
    if (data.length == 0) {
      return res.json({
        status: "User doesn't exist",
      });
    }
    res.json({
      status: "ok",
      data: data,
      message: "User login successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let generatePassword = function (length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

let forgot_password = async function (req, res) {
  let body = req.body;
  let newPassword = generatePassword(8);
  console.log(newPassword);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "abelardo.boehm54@ethereal.email",
        pass: "qgN1WPD75S48KHzUPn",
      },
    });

    const mailOptions = {
      from: '"Hiren" <hiren@123>',
      to: "hirenkhunt5960@gmail.com",
      subject: "New Password",
      text: `Your new password is ${newPassword}`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({
      status: "New password mail send successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};


let add_product = async function (req, res) {
  let body = req.body;
  try {
    
    let product_detail = new ProductDetail();
    product_detail.Name = body.Name;
    product_detail.Price = body.Price;
    product_detail.Description = body.Description;
    product_detail.Category = body.Category;
    product_detail.CareInstructions = body.CareInstructions;
    product_detail.ProductQuantity = body.ProductQuantity;
    product_detail.ImageURL = body.ImageURL;
    product_detail.UserId = body.UserId;

    product_detail.save();
    res.json({
      status: "ok",
      message: "product added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

let get_seller_products = async function (req, res) {
  let body = req.body;
  try {
    let products;
    if (body.Category) {
      products = await ProductDetail.find({
        Category: body.Category,
      });
    } else {
      products = await ProductDetail.find({UserId: body.UserId});
    }
    res.json({
      status: "ok",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};


let CheckImageUsingAnalysis = async function (req, res) {
  let body = req.body;
  try {
    // Read the uploaded image file
    const imageBuffer = req.file.buffer;

    // Perform image analysis using Google Cloud Vision API
    const [result] = await client.labelDetection(imageBuffer);
    const labels = result.labelAnnotations;

    // Check if any label matches "plant"
    const isPlantImage = labels.some((label) => label.description.toLowerCase().includes('plant'));

    res.json({ isPlantImage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Image analysis failed' });
  }
};

module.exports = {
  user_registration: user_registration,
  login_verify: login_verify,
  forgot_password: forgot_password,
  add_product: add_product,
  get_seller_products: get_seller_products,
  CheckImageUsingAnalysis: CheckImageUsingAnalysis,
};
