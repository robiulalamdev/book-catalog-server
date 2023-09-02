import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { UserService } from './user.service';

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAll();
  sendResponse<User[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingle(req.params.id);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const UserController = {
  getAll,
  getSingle,
};
