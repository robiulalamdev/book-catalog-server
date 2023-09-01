import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

import { User } from '@prisma/client';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.create(req.body);
  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: result,
  });
});

export const UserController = {
  create,
};
