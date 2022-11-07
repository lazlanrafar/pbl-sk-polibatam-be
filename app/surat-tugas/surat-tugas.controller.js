const { Ok, InternalServerError } = require("../../utils/http-response");
const {
  FetchSuratTugas,
  CreateSuratTuas,
  UpdateSuratTugas,
  DeleteSuratTugas,
  GetTagGroupByName,
} = require("./surat-tugas.repository");

module.exports = {
  ReadSuratTugas: async (req, res) => {
    try {
      const result = await FetchSuratTugas();

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
  CreateSuratTugas: async (req, res) => {
    try {
      const payload = {
        nama: req.body.nama,
        filePath: req.files.filePath[0].path.split("\\").pop(),
        deskripsi: req.body.deskripsi,
        tagId: +req.body.tagId,
        createdBy: req.body.createdBy,
      };

      const result = await CreateSuratTuas(payload);

      Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  UpdateSuratTugas: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        tagId: +req.body.tagId,
      };

      if (req.files.filePath) {
        payload.filePath = req.files.filePath[0].path.split("\\").pop();
      }

      // console.log(payload);

      const result = await UpdateSuratTugas(req.params.id, payload);
      return Ok(res, result, "Berhasil mengubah Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  DeleteSuratTugas: async (req, res) => {
    try {
      const result = await DeleteSuratTugas(req.params.id);
      return Ok(res, result, "Berhasil menghapus Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  ImportSuratTugas: async (req, res) => {
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

        await CreateSuratTuas(payload);
      }

      return Ok(res, {}, "Berhasil membuat Surat Keputusan");
    } catch (error) {
      InternalServerError(res, {}, "Gagal Import Surat Keputusan");
      console.log(error);
    }
  },
};
