const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.route");
const userRoute = require("../app/user/user.route");

const tagGroupRoute = require("../app/tag-group/tag-group.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/user`, AuthToken, userRoute);
  app.use(`${preRoute}/tag-group`, AuthToken, tagGroupRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({
      user: req.user,
      secretkey: req.secretkey,
    });
  });
};
