const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  FetchUser: async () => {
    return await prisma.tbm_user.findMany();
  },
  FetchUserById: async (id) => {
    return await prisma.tbm_user.findUnique({
      where: {
        id: id,
      },
    });
  },
  FetchUserByEmail: async (email) => {
    return await prisma.tbm_user.findUnique({
      where: {
        email: email,
      },
    });
  },
  StoreUser: async (payload) => {
    return await prisma.tbm_user.create({
      data: payload,
    });
  },
  UpdateUser: async (id, payload) => {
    return await prisma.tbm_user.update({
      where: {
        id: id,
      },
      data: payload,
    });
  },
};
