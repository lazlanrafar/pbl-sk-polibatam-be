const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchIsAdmin: async (uid) => {
    return await prisma.tbm_admin.findUnique({
      where: {
        uid: uid,
      },
    });
  },
};
