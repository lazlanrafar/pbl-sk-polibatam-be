const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchSuratTugas: async (id) => {
    if (id) {
      return await prisma.suratTugas.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    }
    return await prisma.suratTugas.findMany();
  },
};
