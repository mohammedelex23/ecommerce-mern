const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);

router.get("/:id/shippingAddress", userCtrl.getShippingAddress);
router.put("/:id/shippingAddress", userCtrl.setShippingAddress);
module.exports = router;
