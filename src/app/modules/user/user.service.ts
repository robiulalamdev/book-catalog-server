import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUserSignin, IUserSigninResponse } from './user.interface';
const prisma = new PrismaClient();

const create = async (data: User): Promise<User> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const signin = async (data: IUserSignin): Promise<IUserSigninResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  console.log(isUserExist);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id, email, role } = isUserExist;
  const token = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { token };
};

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
  create,
  getSingle,
  getAll,
  update,
  deleteSingle,
  signin,
};
