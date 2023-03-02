const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  StorePengajuan: async (data) => {
    return await prisma.tbl_pengajuan.create({
      data,
    });
  },
};
