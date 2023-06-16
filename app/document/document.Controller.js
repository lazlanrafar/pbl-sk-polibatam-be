const { InternalServerError, Ok } = require("../../utils/http-response");
const {
  StoreDocument,
  StoreDocumentDetail,
  FetchDocumentByType,
  FetchDocumentById,
  UpdateDocument,
  DestroyAllDocumentDetailByIdDocument,
  DestroyDocument,
} = require("./document.Repository");

module.exports = {
  GetDocumentByType: async (req, res) => {
    try {
      const user = req.user;
      const { type, year } = req.query;
      const result = await FetchDocumentByType(type, +year);

      result.forEach((element) => {
        element.data_pegawai = JSON.parse(element.data_pegawai);

        element.details.forEach((el) => {
          for (const iterator of JSON.parse(el.tag_group.data_pegawai)) {
            element.data_pegawai.push(iterator);
          }
        });

        delete element.details;
      });

      let data = [];
      if (user.isAdmin) {
        data = result;
      } else {
        data = result.filter((el) =>
          el.data_pegawai.some((el) => el.NIP == user.id)
        );
      }

      data.forEach((element) => {
        delete element.data_pegawai;
      });

      return Ok(res, data, "Successfull to get document");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to get document");
    }
  },
  GetDocumentById: async (req, res) => {
    try {
      const result = await FetchDocumentById(req.params.id);

      result.data_pegawai = JSON.parse(result.data_pegawai);

      result.details.forEach((element) => {
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
        date: req.body.date,
        filepath: req.files.filepath[0].filename,
        name: req.body.name,
        remarks: req.body.remarks,
        data_pegawai: req.body.data_pegawai,
        created_by: req.body.created_by,
      });

      if (req.body.details && req.body.details.length > 0) {
        for (const iterator of req.body.details) {
          await StoreDocumentDetail({
            id_document: result.id,
            id_tag_group: iterator.id,
          });
        }
      }

      return Ok(res, {}, "Successfull to create document");
    } catch (error) {
      console.log(error);
      return InternalServerError(res, error, "Failed to create document");
    }
  },
  EditDocument: async (req, res) => {
    try {
      const data = {
        type: req.body.type,
        date: req.body.date,
        name: req.body.name,
        remarks: req.body.remarks,
        data_pegawai: req.body.data_pegawai,
      };

      if (req.files.filepath) {
        data.filepath = req.files.filepath[0].filename;
      }

      const result = await UpdateDocument(req.params.id, data);

      await DestroyAllDocumentDetailByIdDocument(req.params.id);

      if (req.body.details && req.body.details.length > 0) {
        for (const iterator of req.body.details) {
          await StoreDocumentDetail({
            id_document: result.id,
            id_tag_group: iterator.id,
          });
        }
      }

      return Ok(res, {}, "Successfull to update document");
    } catch (error) {
      return InternalServerError(res, error, "Failed to update document");
    }
  },
  DeleteDocument: async (req, res) => {
    try {
      await DestroyAllDocumentDetailByIdDocument(req.params.id);
      await DestroyDocument(req.params.id);

      return Ok(res, {}, "Successfull to delete document");
    } catch (error) {
      return InternalServerError(res, error, "Failed to delete document");
    }
  },
};
