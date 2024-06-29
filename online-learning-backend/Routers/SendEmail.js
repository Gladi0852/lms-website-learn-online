const express = require("express");
const emailController = require("../Controller/sendEmail");

const router = express.Router();
router
  .post("/send-email", emailController.sendEmail)
  .post("/emailVerify", emailController.sendOTP);

exports.router = router;
