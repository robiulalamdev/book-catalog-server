import { Book, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getSingle = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const getAll = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

const getAllByCate = async (cateId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: cateId,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const update = async (id: string, Payload: Partial<Book>): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data: Payload,
  });

  return result;
};

const deleteSingle = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookService = {
  create,
  getSingle,
  getAll,
  getAllByCate,
  update,
  deleteSingle,
};
