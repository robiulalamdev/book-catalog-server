import { Book, PrismaClient } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
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

const getAll = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'price';
  const sortOrder = options.sortOrder || 'desc';
  const result = await prisma.book.findMany({
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
    },
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      size: limit,
      total,
      totalPage,
    },
    data: result,
  };
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
