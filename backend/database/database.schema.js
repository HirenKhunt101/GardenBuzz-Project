const mongoose = require("mongoose");

// const User_Schema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   CreatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   UpdatedAt: Date,
// });

// const User = mongoose.model("user", User_Schema);
// module.exports.user = User;

const User_detail = new mongoose.Schema({
  NurseryName: String,
  Email: String,
  ContactNumber: String,
  Address: String,
  Pincode: String,
  Username: String,
  Password: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: Date,
  UserType: String,
});

const UserDetail = mongoose.model("user_detail", User_detail);
module.exports.user_detail = UserDetail;

const Product_detail = new mongoose.Schema({
  Name: String,
  Price: Number,
  Description: String,
  PotColor: String,
  CareInstructions: String,
  ProductQuantity: Number,
  ImageURL: String,
  Category: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: Date,
  UserId: {
    type: "ObjectId",
    ref: "UserDetail",
  },
});

const Productdetail = mongoose.model("product_detail", Product_detail);
module.exports.product_detail = Productdetail;

const Cart_detail = new mongoose.Schema({
  UserId: {
    type: "ObjectId",
    ref: "UserDetail",
  },
  ProductId: {
    type: "ObjectId",
    ref: "Productdetail",
  },
  Quantity: {
    type: String,
    default: 1,
  },
  PotColor: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: Date,
});

const Cartdetail = mongoose.model("cart_detail", Cart_detail);
module.exports.cart_detail = Cartdetail;


const chatMessageSchema = new mongoose.Schema({
  SenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  },
  ReceiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetail',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("chat_message", chatMessageSchema);
module.exports.chat_message = ChatMessage;