const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchAdmin: async () => {
    return await prisma.tbm_admin.findMany();
  },
  FetchIsAdmin: async (uid) => {
    return await prisma.tbm_admin.findUnique({
      where: {
        uid: uid,
      },
    });
  },
  CreateAdmin: async (uid) => {
    return await prisma.tbm_admin.create({
      data: {
        uid: uid,
      },
    });
  },
  DestroyAdmin: async (uid) => {
    return await prisma.tbm_admin.delete({
      where: {
        uid: uid,
      },
    });
  },
};
