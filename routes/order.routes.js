const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");

router.post("/", orderCtrl.createOrder);

module.exports = router;
