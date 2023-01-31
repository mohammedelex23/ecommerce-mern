const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const {
  validateSignup,
  validateLogin,
} = require("../middlewares/userValidationMiddlewares");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/signup", validateSignup, authCtrl.signup);
router.post("/login", validateLogin, authCtrl.login);
router.put("/verify", authMiddlewares.verifyToken, authCtrl.verifyAccount);

module.exports = router;
