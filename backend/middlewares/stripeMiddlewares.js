const { BadRequest } = require("../error/errorClass");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product.model");
const validateCreateCheckout = function (req, res, next) {
  let { cart } = req.body;

  if (!Array.isArray(cart)) {
    return next(
      new BadRequest(
        "please send the cart in the request body as: {cart:[{item1},{item2},...]}"
      )
    );
  }
  if (cart.length === 0) {
    return next(new BadRequest("cart should not be empty"));
  }
  //   check all items for qty and valid _id
  let result = cart.every(
    (item) => item.qty && item.qty > 0 && item._id && isValidObjectId(item._id)
  );
  if (!result) {
    return next(new BadRequest("invalid cart array"));
  }
  req.cart = cart;
  next();
};
const fetchProductsPrices = async function (req, res, next) {
  try {
    let productsIds = req.cart.map((item) => item._id);

    let promises = productsIds.map(
      async (id) => await Product.findById(id).select("_id price")
    );
    let products = await Promise.all(promises);

    let prices = {};
    products.forEach((item) => {
      if (item) prices[item._id] = item.price;
    });

    req.cart = req.cart.map((item) => {
      if (prices[item._id]) {
        item.price = prices[item._id];
        return item;
      } else {
        return null;
      }
    });
    req.cart = req.cart.filter((item) => Boolean(item));

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { validateCreateCheckout, fetchProductsPrices };
