const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);

module.exports = router;
