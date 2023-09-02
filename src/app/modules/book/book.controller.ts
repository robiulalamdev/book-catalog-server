import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.create(req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books Create successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAll(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllByCate = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllByCate(req.params.categoryId);
  sendResponse<Book[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books with associated category data fetched successfully',
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingle(req.params.id);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.update(req.params.id, req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteSingle(req.params.id);
  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  create,
  getAll,
  getAllByCate,
  getSingle,
  update,
  deleteSingle,
};
