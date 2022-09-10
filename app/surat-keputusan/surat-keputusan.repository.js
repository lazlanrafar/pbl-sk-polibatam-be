const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchSuratKeputusan: async (id) => {
    if (id) {
      return await prisma.suratKeputusan.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    }
    return await prisma.suratKeputusan.findMany();
  },
};
