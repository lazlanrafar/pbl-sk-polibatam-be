const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchPengajuan: async (created_by) => {
    return await prisma.tbl_pengajuan.findMany({
      where: {
        ...(created_by && { created_by: created_by }),
      },
      select: {
        id: true,
        title: true,
        type: true,
        is_lampiran: true,
        filepath_lampiran: true,
        pickup_plan: true,
        status: true,
        created_at: true,
        created_by: true,
      },
    });
  },
  StorePengajuan: async (data) => {
    return await prisma.tbl_pengajuan.create({
      data,
    });
  },
};
