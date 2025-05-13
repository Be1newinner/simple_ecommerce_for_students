require("dotenv").config();

const express = require("express");
const ConnectDB = require("./config/db.config.js");

const { ProductRouter } = require("./features/products/products.route.js");
const { AuthRouter } = require("./features/auth/auth.route.js");
const { CartRouter } = require("./features/carts/carts.route.js");
const { AddressRouter } = require("./features/address/address.route.js");
const { OrderRouter } = require("./features/orders/orders.route.js");

const app = express();
const PORT = process.env.PORT || 8004;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to Simple Ecommerce!");
  return;
});

app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.use("/address", AddressRouter)
app.use("/orders", OrderRouter)

let server;

async function startServer() {
  try {
    await ConnectDB();
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, server }
