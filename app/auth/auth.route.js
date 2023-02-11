const express = require("express");
const {
  RegisterMiddleware,
  LoginMiddware,
  SendEmailMiddleware,
  ForgotPasswordMiddleware,
} = require("./auth.middleware");
const {
  Register,
  Login,
  SendEmail,
  ForgotPassword,
} = require("./auth.controller");
const router = express.Router();

router.post("/register", RegisterMiddleware, Register);
router.post("/login", LoginMiddware, Login);
router.post("/send-email", SendEmailMiddleware, SendEmail);
router.post(
  "/forgot-password/:token",
  ForgotPasswordMiddleware,
  ForgotPassword
);

module.exports = router;
