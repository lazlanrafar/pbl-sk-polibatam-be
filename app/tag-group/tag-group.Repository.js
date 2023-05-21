const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchTagGroup: async () => {
    return await prisma.tbm_tag_group.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        created_by: true,
      },
    });
  },
  FetchTagGroupById(id) {
    return prisma.tbm_tag_group.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        data_pegawai: true,
        created_by: true,
        created_at: true,
      },
    });
  },
  FetchTagGroupByName: async (name) => {
    return await prisma.tbm_tag_group.findUnique({
      where: {
        name: name,
      },
    });
  },
  StoreTagGroup: async (data) => {
    return await prisma.tbm_tag_group.create({
      data,
    });
  },
  UpdateTagGroup: async (id, data) => {
    return await prisma.tbm_tag_group.update({
      where: {
        id: id,
      },
      data,
    });
  },
  DestroyTagGroup: async (id) => {
    return await prisma.tbm_tag_group.update({
      where: {
        id: id,
      },
      data: {
        is_deleted: true,
      },
    });
  },
};
