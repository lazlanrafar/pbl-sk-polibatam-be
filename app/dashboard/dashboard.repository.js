const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchTotalSuratTugas: async () => {
    return await prisma.suratTugas.count();
  },
  FetchTotalSuratKeputusan: async () => {
    return await prisma.suratKeputusan.count();
  },
  FetchTotalTagGroup: async () => {
    return await prisma.tagGroup.count();
  },
  FetchTotalAdmin: async () => {
    return await prisma.admin.count();
  },
  FetchRecentFileSuratTugas: async () => {
    return await prisma.suratTugas.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        TagGroup: true,
      },
      take: 5,
    });
  },
  FetchRecentFileSuratKeputusan: async () => {
    return await prisma.suratKeputusan.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        TagGroup: true,
      },
      take: 5,
    });
  },
};
