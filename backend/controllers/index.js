const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("../database/database.schema");
let mongo = require("./../database/database.service");
app.use(cors());
app.use(express.json());
require("dotenv").config({ path: __dirname + "./../../backend/.env" });
const seller = require("./seller");
const guest = require("./../routes/guest_operation");

// const
// const db_url =
//   "mongodb+srv://hirenkhunt:hiren6351@cluster0.hrfgclf.mongodb.net/?retryWrites=true&w=majority";

// const db_u =
//   "mongodb+srv://hirenkhunt:hiren6351@cluster0.hrfgclf.mongodb.net/gardenbuzz";
// mongoose
//   .connect(db_u, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("mongo connection success");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(4200, () => {
  console.log("server is running on 4200");
});

// app.post("/login", async (req, res) => {
//   console.log("Joker");
// });

app.get("/test", async (req, res) => {
  // console.log(joker);
  res.send("<h1>Working Fine</h1>");
});

app.use("/gardenbuzz", guest);
