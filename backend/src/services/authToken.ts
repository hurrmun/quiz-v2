import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { config as dotenv } from 'dotenv';
import { IFullUserProfile, IUserProfile } from '../types/interface';
dotenv();

const privateKey = process.env.JWT_ACCESS_SECRET as string;
const refreshKey = process.env.JWT_REFRESH_SECRET as string;

export const generateAccessToken = async ({
  id,
  email,
  username,
}: IUserProfile) => {
  const payload = { user_id: id, email: email, username: username };
  const accessToken = jwt.sign(payload, privateKey, {
    expiresIn: '10m',
    algorithm: 'HS256',
    noTimestamp: true,
  });

  return accessToken;
};

export const generateRefreshToken = async ({
  id,
  email,
  username,
}: IUserProfile) => {
  const payload = { user_id: id, email: email, username: username };
  const accessToken = jwt.sign(payload, refreshKey, {
    algorithm: 'HS256',
    noTimestamp: true,
  });

  return accessToken;
};
