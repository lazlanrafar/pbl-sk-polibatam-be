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
};
