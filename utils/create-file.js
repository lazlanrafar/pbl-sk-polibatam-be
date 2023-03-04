const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

module.exports = {
  CreateBorangPengajuanSurat: async (data) => {
    try {
      const content_file = fs.readFileSync(
        path.resolve("public", "templates", "TemplateBorangPengajuan.docx"),
        "binary"
      );

      const zip = new PizZip(content_file);

      const doc = new Docxtemplater(zip);

      doc.render({
        ...data,
      });

      const fileName = `Borang Pengajuan Surat ${moment().format(
        "DD-MM-YYYY"
      )}.docx`;

      const buffer = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });

      fs.writeFileSync(path.resolve("public", "documents", fileName), buffer);

      return fileName;
    } catch (error) {
      console.log(error);
      throw new Error("Gagal membuat borang pengajuan surat");
    }
  },
};
