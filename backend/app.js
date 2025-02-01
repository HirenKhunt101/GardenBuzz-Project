const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./database/database.schema");
let mongo = require("./database/database.service");
app.use(cors());
app.use(express.json());
require("dotenv").config({ path: __dirname + "./.env" });
const guest = require("./routes/guest_operation");

app.listen(4200, () => {
  console.log("server is running on 4200");
});

app.post("/login", async (req, res) => {
  console.log("Joker");
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/test", async (req, res) => {
  // console.log(joker);
  res.send("<h1>Working Fine</h1>");
});
app.post("/testpost", async (req, res) => {
  // console.log(joker);
  res.send("<h1>Working Fine</h1>");
});

app.use("/gardenbuzz", guest);
