const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchDocumentDashboard: async () => {
    return await prisma.tbl_document.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        name: true,
        filepath: true,
        type: true,
        date: true,
        remarks: true,
        data_pegawai: true,
        created_at: true,
        created_by: true,
        details: {
          select: {
            tag_group: {
              select: {
                data_pegawai: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
};
