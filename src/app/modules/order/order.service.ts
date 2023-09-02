import { Order, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (data: any): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

export const OrderService = {
  create,
};
