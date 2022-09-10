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
  CreateSuratKeputusan: async (data) => {
    // console.log(data);
    return await prisma.suratKeputusan.create({
      data,
    });
  },
  UpdateSuratKeputusan: async (id, data) => {
    // console.log(id, data);
    return await prisma.suratKeputusan.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  },
};
