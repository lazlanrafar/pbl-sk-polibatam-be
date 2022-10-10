const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchSuratTugas: async (id) => {
    return await prisma.suratTugas.findMany({
      include: {
        TagGroup: true,
      },
    });
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
  DeleteSuratTugas: async (id) => {
    return await prisma.suratTugas.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
};
