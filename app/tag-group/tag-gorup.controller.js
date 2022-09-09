const { PrismaClient } = require("@prisma/client");
const { InternalServerError, Ok } = require("../../utils/http-response");

const prisma = new PrismaClient();

module.exports = {
  ReadTagGroup: async (req, res) => {
    try {
      if (req.params.id) {
        const result = await prisma.tagGroup.findUnique({
          where: {
            id: parseInt(req.params.id),
          },
        });
        return Ok(res, result, "Berhasil mengambil data");
      }

      const result = await prisma.tagGroup.findMany();
      return Ok(res, result, "Berhasil mengambil data");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
  CreateTagGroup: async (req, res) => {
    try {
      const result = await prisma.tagGroup.create({
        data: req.body,
      });
      return Ok(res, result, "Berhasil membuat Tag Group");
    } catch (error) {
      InternalServerError(res, {}, "Terjadi Kesalahan");
    }
  },
};
