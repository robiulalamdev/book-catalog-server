import { Book, Prisma, PrismaClient } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { BookQueryOptions } from './book.interface';
import { catchBookQuery } from './book.utils';
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
  options: BookQueryOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, sortBy, sortOrder } = catchBookQuery(options, [
    'page',
    'size',
    'skip',
    'sortBy',
    'sortOrder',
  ]);
  const { minPrice, maxPrice, search } = catchBookQuery(options, [
    'minPrice',
    'maxPrice',
    'search',
  ]);

  const pageQ = Number(page || 1);
  const sizeQ = Number(size || 10);
  const skipQ = (pageQ - 1) * sizeQ;
  const sortByQ = sortBy || 'price';
  const sortOrderQ = sortOrder || 'desc';

  const minP = Number(minPrice) || 0;
  const maxP = Number(maxPrice);

  const priceFilters = [];

  if (minP) {
    priceFilters.push({
      price: {
        gte: minP,
      },
    });
  }

  if (maxP) {
    priceFilters.push({
      price: {
        lte: maxP,
      },
    });
  }

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: ['title', 'author', 'genre'].map(filed => ({
        [filed]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  const allConditions = andConditions.concat(priceFilters as any);

  const whereConditions: Prisma.BookWhereInput =
    allConditions.length > 0 ? { AND: allConditions } : {};

  const result = await prisma.book.findMany({
    take: sizeQ,
    skip: skipQ,
    orderBy: {
      [sortByQ]: sortOrderQ,
    },
    where: whereConditions,
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / sizeQ);
  return {
    meta: {
      page: pageQ,
      size: sizeQ,
      total,
      totalPage,
    },
    data: result,
  };
};

const getAllByCate = async (
  cateId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const skip = (page - 1) * size;
  const sortBy = options.sortBy || 'price';
  const sortOrder = options.sortOrder || 'desc';

  const result = await prisma.book.findMany({
    take: size,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: {
      categoryId: cateId,
    },
    include: {
      category: true,
    },
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
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
