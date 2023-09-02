import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

import { IUser } from './auth.interface';

const create = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...responseData } = await AuthService.create(req.body);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: responseData,
  });
});

const sginin = catchAsync(async (req: Request, res: Response) => {
  const { token } = await AuthService.signin(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    token: token,
  });
});

export const AuthController = {
  create,
  sginin,
};
