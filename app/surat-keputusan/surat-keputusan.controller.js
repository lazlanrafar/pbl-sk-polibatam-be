const { Ok, InternalServerError } = require("../../utils/http-response");
const { GetTagGroupByName } = require("../surat-tugas/surat-tugas.repository");
const {
  FetchSuratKeputusan,
  CreateSuratKeputusan,
  UpdateSuratKeputusan,
  DeleteSuratKeputusan,
} = require("./surat-keputusan.repository");

module.exports = {
  ReadSuratKeputusan: async (req, res) => {
    try {
      const result = await FetchSuratKeputusan();

      if (req.query.nim) {
        let resultNim = [];
        for (const iterator of result) {
          let tag = JSON.parse(iterator.TagGroup.tag);
          for (const t of tag) {
            if (t.nim_nik_unit == req.query.nim) {
              resultNim.push(iterator);
              break;
            }
          }
        }

        return Ok(res, resultNim, "Berhasil mengambil data");
      }

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  CreateSuratKeputusan: async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        filePath: req.files.filePath[0].path.split("\\").pop(),
        deskripsi: req.body.deskripsi,
        tagId: +req.body.tagId,
        createdBy: req.body.createdBy,
      };
      const result = await CreateSuratKeputusan(payload);
      return Ok(res, result, "Berhasil membuat Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  UpdateSuratKeputusan: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        tagId: +req.body.tagId,
      };

      if (req.files.filePath) {
        payload.filePath = req.files.filePath[0].path.split("\\").pop();
      }

      const result = await UpdateSuratKeputusan(req.params.id, payload);
      return Ok(res, result, "Berhasil mengubah Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  DeleteSuratKeputusan: async (req, res) => {
    try {
      const result = await DeleteSuratKeputusan(req.params.id);
      return Ok(res, result, "Berhasil menghapus Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  ImportSuratKeputusan: async (req, res) => {
    try {
      for (const iterator of req.body) {
        const TagGroup = await GetTagGroupByName(iterator["Nama Tag"]);

        const payload = {
          nama: iterator.Nama,
          filePath: iterator.Dokumen,
          deskripsi: iterator.Deskripsi,
          tagId: +TagGroup.id,
          createdBy: iterator["Dibuat Oleh"].toString(),
        };

        await CreateSuratKeputusan(payload);
      }

      return Ok(res, {}, "Berhasil membuat Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
