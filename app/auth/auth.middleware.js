const { Compare } = require("../../utils/hash-password");
const {
  BadRequest,
  InternalServerError,
  Unauthorized,
} = require("../../utils/http-response");
const { DecryptToken } = require("../../utils/jwt");
const { FetchUserByEmail, FetchUserById } = require("../user/user.repository");

module.exports = {
  RegisterMiddleware: async (req, res, next) => {
    try {
      const body = req.body;
      const { email } = body;

      const user = await FetchUserByEmail(email);
      if (user) return BadRequest(res, "Email already registered");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to register user");
    }
  },
  LoginMiddware: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await FetchUserByEmail(email);
      if (!user) return BadRequest(res, "Email not registered");

      const isPasswordValid = await Compare(password, user.password);
      if (!isPasswordValid) return BadRequest(res, "Password is incorrect");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to login user");
    }
  },
  SendEmailMiddleware: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await FetchUserByEmail(email);
      if (!user) return BadRequest(res, "Email not registered");

      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to send email");
    }
  },
  ForgotPasswordMiddleware: async (req, res, next) => {
    try {
      const body = req.body;
      if (body.password !== body.confirmPassword)
        return BadRequest(res, "Password not match");

      const token = req.params.token;
      if (!token) return BadRequest(res, "Token not found");

      const deCode = DecryptToken(token);
      const user = await FetchUserById(deCode.id);

      if (!user) return BadRequest(res, "Email not registered");

      req.user = user;
      next();
    } catch (error) {
      return InternalServerError(res, error, "Failed to change password");
    }
  },
};
