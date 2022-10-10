const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchSuratKeputusan: async () => {
    return await prisma.suratKeputusan.findMany({
      include: {
        TagGroup: true,
      },
    });
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
  DeleteSuratKeputusan: async (id) => {
    return await prisma.suratKeputusan.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
};
