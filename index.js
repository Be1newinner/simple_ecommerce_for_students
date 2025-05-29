require("dotenv").config();

const express = require("express");
const ConnectDB = require("./src/shared/config/db.config.js");

const { ProductRouter } = require("./src/features/products/products.route.js");
const { AuthRouter } = require("./src/features/auth/auth.route.js");
const { CartRouter } = require("./src/features/carts/carts.route.js");
const { AddressRouter } = require("./src/features/address/address.route.js");
const { OrderRouter } = require("./src/features/orders/orders.route.js");

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

async function startServer() {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();

