const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchDocumentDashboard: async () => {
    return await prisma.tbl_document.findMany({
      where: {
        is_deleted: false,
      },
      select: {
        type: true,

        data_pegawai: true,
        details: {
          select: {
            tag_group: {
              select: {
                data_pegawai: true,
              },
            },
          },
        },
        name: true,
        remarks: true,
        created_at: true,
        created_by: true,
        filepath: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
};
