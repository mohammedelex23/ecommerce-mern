const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const {
  validateSignup,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require("../middlewares/validationMiddlewares");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/signup", validateSignup, authCtrl.signup);
router.post("/login", validateLogin, authCtrl.login);
router.get("/resend_email/:userId", authCtrl.resendEmail);
router.put("/verify", authMiddlewares.verifyToken, authCtrl.verifyAccount);
router.post(
  "/forgot_password",
  validateForgotPassword,
  authCtrl.forgotPassword
);
router.post("/reset_password", validateResetPassword, authCtrl.resetPassword);

module.exports = router;
