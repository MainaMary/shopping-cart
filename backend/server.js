const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products");
const port = process.env.PORT || 5000;
//configure middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to our online shop");
});
app.get("/products", (req, res) => {
  res.send(products);
});

app.listen(port, console.log(`server is running on ${port}`));
