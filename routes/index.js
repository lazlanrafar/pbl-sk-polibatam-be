const { AuthToken } = require("../shared/middleware.shared");

const authRoute = require("../app/auth/auth.route");

const dashboardRoute = require("../app/dashboard/dashboard.Route");

const tagGroupRoute = require("../app/tag-group/tag-group.Route");
const documentRoute = require("../app/document/document.Route");

const pengajuanRoute = require("../app/pengajuan/pengajuan.Route");

// Setup
const adminRoute = require("../app/admin/admin.Route");
const mahasiswaRoute = require("../app/mahasiswa/mahasiswa.Route");
const pegawaiRoute = require("../app/pegawai/pegawai.Route");

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/`, authRoute);

  app.use(`${preRoute}/dashboard`, AuthToken, dashboardRoute);

  app.use(`${preRoute}/tag-group`, AuthToken, tagGroupRoute);
  app.use(`${preRoute}/document`, AuthToken, documentRoute);

  app.use(`${preRoute}/pengajuan`, AuthToken, pengajuanRoute);

  // Setup
  app.use(`${preRoute}/admin`, AuthToken, adminRoute);
  app.use(`${preRoute}/mahasiswa`, AuthToken, mahasiswaRoute);
  app.use(`${preRoute}/pegawai`, AuthToken, pegawaiRoute);

  app.get(`${preRoute}/whois`, AuthToken, (req, res) => {
    res.json({
      user: req.user,
      secretkey: req.secretkey,
    });
  });
};
