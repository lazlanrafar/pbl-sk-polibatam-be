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
};
