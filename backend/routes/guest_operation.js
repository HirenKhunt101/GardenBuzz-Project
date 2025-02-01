const express = require("express");
const router = express.Router();
let seller = require("./../controllers/seller");
let buyer = require("./../controllers/buyer");
let functionality = require('./../controllers/functionality')

router.post("/user_registration", seller.user_registration);
router.post("/login_verify", seller.login_verify);
router.post("/add_product", seller.add_product);
router.post("/get_seller_products", seller.get_seller_products);
router.post("/CheckImageUsingAnalysis", seller.CheckImageUsingAnalysis);


router.post("/add_product_in_cart", buyer.add_product_in_cart);
router.post("/remove_product_from_cart", buyer.remove_product_from_cart);
router.post("/get_cart_details", buyer.get_cart_details);
router.post("/place_order", buyer.place_order);
router.post("/read_product_detail", buyer.read_product_detail);
router.post(
  "/update_cart_product_quantity",
  buyer.update_cart_product_quantity
);


router.post(
  "/send_message",
  functionality.send_message
);
router.post(
  "/read_history_messages",
  functionality.read_history_messages
);



module.exports = router;
