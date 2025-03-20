require("dotenv").config();

const express = require("express");
const ConnectDB = require("./config/db.config.js");

const { ProductRouter } = require("./routes/products.route.js");
const { AuthRouter } = require("./routes/users.route.js");
const { CartRouter } = require("./routes/carts.route.js");
const { AddressRouter } = require("./routes/address.route.js");
const { OrderRouter } = require("./routes/orders.route.js");

const app = express();
const PORT = process.env.PORT || 8000;

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

ConnectDB()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
