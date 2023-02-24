const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreDocument,
  StoreDocumentDetail,
  FetchDocumentByType,
  FetchDocumentById,
} = require("./document.Repository");

module.exports = {
  GetDocumentByType: async (req, res) => {
    try {
      const result = await FetchDocumentByType(req.params.type);

      return Ok(res, result, "Successfull to get document");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get document");
    }
  },
  GetDocumentById: async (req, res) => {
    try {
      const result = await FetchDocumentById(req.params.id);

      result.data_mahasiswa = JSON.parse(result.data_mahasiswa);
      result.data_pegawai = JSON.parse(result.data_pegawai);

      result.details.forEach((element) => {
        element.tag_group.data_mahasiswa = JSON.parse(
          element.tag_group.data_mahasiswa
        );
        element.tag_group.data_pegawai = JSON.parse(
          element.tag_group.data_pegawai
        );
      });

      return Ok(res, result, "Successfull to get document");
    } catch (error) {
      return InternalServerError(res, error, "Failed to get document");
    }
  },
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
