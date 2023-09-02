import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const getSingle = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const getAll = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({});
  return result;
};

const update = async (id: string, Payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: Payload,
  });

  return result;
};

const deleteSingle = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const UserService = {
  getSingle,
  getAll,
  update,
  deleteSingle,
};
