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
  FetchPengajuanById: async (id) => {
    return await prisma.tbl_pengajuan.findUnique({
      where: {
        id: id,
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
        date_issue: true,
        list_consider: true,
        list_decide: true,
        list_observe: true,
      },
    });
  },
  StorePengajuan: async (data) => {
    return await prisma.tbl_pengajuan.create({
      data,
    });
  },
  UpdatePengajuan: async (id, data) => {
    return await prisma.tbl_pengajuan.update({
      where: {
        id: id,
      },
      data,
    });
  },
  DestoryPengajuan: async (id) => {
    return await prisma.tbl_pengajuan.delete({
      where: {
        id: id,
      },
    });
  },
};
