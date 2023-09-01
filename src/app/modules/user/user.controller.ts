import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

import { IUser } from './user.interface';

const create = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...responseData } = await UserService.create(req.body);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: responseData,
  });
});

const sginin = catchAsync(async (req: Request, res: Response) => {
  const { token } = await UserService.signin(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: token,
  });
});

export const UserController = {
  create,
  sginin,
};
