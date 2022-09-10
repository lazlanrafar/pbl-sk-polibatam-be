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
  CreateSuratTuas: async (data) => {
    return await prisma.suratTugas.create({
      data,
    });
  },
  UpdateSuratTugas: async (id, data) => {
    return await prisma.suratTugas.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  },
};
