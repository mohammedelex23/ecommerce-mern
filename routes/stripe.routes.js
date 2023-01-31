const router = require("express").Router();
const stripeCtrl = require("../controllers/stripe.controller");
const authMiddlewares = require("../middlewares/authMiddlewares");
const stripeMiddlewares = require("../middlewares/stripeMiddlewares");
// create checkout session
router.post(
  "/create-checkout-session",
  authMiddlewares.verifyToken,
  authMiddlewares.authenticateUser,
  stripeMiddlewares.validateCreateCheckout,
  stripeMiddlewares.fetchProductsPrices,
  stripeCtrl.createCheckoutSession

  //   fetch products for each object in req.cart
);

// stripe webhooks
// This example uses Express to receive webhooks
const express = require("express");
const app = express();

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
router.post("/webhook", stripeCtrl.webhook);

app.listen(8000, () => console.log("Running on port 8000"));

module.exports = router;
