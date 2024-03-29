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
        filepath: true,
        pickup_plan: true,
        status: true,
        created_at: true,
        created_by: true,
      },
      orderBy: {
        created_at: "desc",
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
        filepath: true,
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
        data_pegawai: true,
        details: {
          select: {
            tag_group: {
              select: {
                id: true,
                name: true,
                data_pegawai: true,
                created_by: true,
              },
            },
          },
        },
      },
    });
  },
  StorePengajuan: async (data) => {
    return await prisma.tbl_pengajuan.create({
      data,
    });
  },
  StorePengajuanDetail: async (data) => {
    return await prisma.tbl_pengajuan_detail.create({
      data: {
        id_pengajuan: data.id_pengajuan,
        id_tag_group: data.id_tag_group,
      },
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
  DestroyAllPengajuanDetailByIdPengajuan: async (id) => {
    return await prisma.tbl_pengajuan_detail.deleteMany({
      where: {
        id_pengajuan: id,
      },
    });
  },
};
