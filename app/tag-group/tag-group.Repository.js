const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
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
};
