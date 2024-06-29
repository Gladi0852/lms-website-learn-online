const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
exports.sendEmail = (req, res) => {
  const { email, name } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for your enquiry!",
    text: `Hi ${name},
    
    Thanks for your enquiry, we will get back to you as soon as we can.

    In the meantime feel free to check out our site Learn Online
    
    Thanks,
    From Learn Online Team`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Error sending email", error });
    }
    res.status(200).send({ message: "Email sent successfully", info });
  });
};
exports.sendOTP = (req, res) => {
  const { email, otp } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Your OTP is <b>${otp}</b> <br>Enter this OTP to verify your email</p><p>This OTP will expire in <b>10 minutes</b></p>`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Error sending email" });
    }
    res.status(200).send({ message: "OTP sent successfully" });
  });
};
