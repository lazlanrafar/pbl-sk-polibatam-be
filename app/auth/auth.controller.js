const { Encrypt } = require("../../utils/hash-password");
const { Ok, InternalServerError } = require("../../utils/http-response");
const { EncryptToken } = require("../../utils/jwt");
const {
  StoreUser,
  FetchUserByEmail,
  UpdateUser,
} = require("../user/user.repository");
const nodemailer = require("nodemailer");

module.exports = {
  Register: async (req, res) => {
    try {
      const body = req.body;

      const payload = {
        ...body,
        password: await Encrypt(body.password),
      };

      const result = await StoreUser(payload);

      return Ok(res, result, "User registered successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to register user");
    }
  },
  Login: async (req, res) => {
    try {
      const body = req.body;
      const user = await FetchUserByEmail(body.email);

      const token = EncryptToken({
        ...user,
      });

      const payload = {
        ...user,
        token,
      };

      return Ok(res, payload, "User logged in successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to login user");
    }
  },
  SendEmail: async (req, res) => {
    try {
      const user = await FetchUserByEmail(req.body.email);
      const token = EncryptToken({
        ...user,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Forgot Password",
        text: `${process.env.BASE_URL}/reset-password/${token}`,
      });

      return Ok(res, "Email sent successfully");
    } catch (error) {
      console.log(error);
      InternalServerError(res, error, "Failed to send email");
    }
  },
  ForgotPassword: async (req, res) => {
    try {
      const body = req.body;
      const user = req.user;

      const payload = {
        password: await Encrypt(body.password),
      };

      const result = await UpdateUser(user.id, payload);

      return Ok(res, result, "Password updated successfully");
    } catch (error) {
      return InternalServerError(res, error, "Failed to register user");
    }
  },
};
