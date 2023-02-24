const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchDocumentByType: async (type) => {
    return await prisma.tbl_document.findMany({
      where: {
        type: type,
      },
      select: {
        id: true,
        name: true,
        remarks: true,
        filepath: true,
        created_at: true,
        created_by: true,
      },
    });
  },
  FetchDocumentById: async (id) => {
    return await prisma.tbl_document.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        remarks: true,
        filepath: true,
        data_mahasiswa: true,
        data_pegawai: true,
        created_by: true,
        created_at: true,
        type: true,
        details: {
          select: {
            tag_group: {
              select: {
                id: true,
                name: true,
                data_mahasiswa: true,
                data_pegawai: true,
                created_by: true,
              },
            },
          },
        },
      },
    });
  },
  StoreDocument: async (data) => {
    return await prisma.tbl_document.create({
      data,
    });
  },
  StoreDocumentDetail: async (data) => {
    return await prisma.tbl_document_detail.create({
      data: {
        id_document: data.id_document,
        id_tag_group: data.id_tag_group,
      },
    });
  },
  UpdateDocument: async (id, data) => {
    return await prisma.tbl_document.update({
      where: {
        id: id,
      },
      data,
    });
  },
  DestroyAllDocumentDetailByIdDocument: async (id) => {
    return await prisma.tbl_document_detail.deleteMany({
      where: {
        id_document: id,
      },
    });
  },
};
