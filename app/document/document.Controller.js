const { InternalServerError, Ok } = require("../../utils/http-response");
const { StoreDocument, StoreDocumentDetail } = require("./document.Repository");

module.exports = {
  CreateDocument: async (req, res) => {
    try {
      const result = await StoreDocument({
        type: req.body.type,
        filepath: req.files.filepath[0].filename,
        name: req.body.name,
        remarks: req.body.remarks,
        data_mahasiswa: req.body.data_mahasiswa,
        data_pegawai: req.body.data_pegawai,
        created_by: req.body.created_by,
      });

      for (const iterator of req.body.details) {
        console.log(iterator);
        await StoreDocumentDetail({
          id_document: result.id,
          id_tag_group: iterator.id,
        });
      }

      return Ok(res, {}, "Successfull to create document");
    } catch (error) {
      //   console.log(error);
      return InternalServerError(res, error, "Failed to create document");
    }
  },
};
