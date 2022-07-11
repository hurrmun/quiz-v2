import bcrypt from 'bcrypt';
import knex from '../database/database';
import {
  IFullUserProfile,
  IUserAccount,
  IUserProfile,
} from '../types/interface';

export const dbCreateUser = async ({
  username,
  email,
  password,
}: IUserAccount) => {
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    return await knex('users').insert({
      username,
      email,
      password: hashed_password,
    });
  } catch (error) {
    console.error(error);
  }
};

export const dbFindUserByEmail = async (email: string) => {
  try {
    const findUser = await knex('users').where('email', email);
    const user = findUser[0];
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const dbFindUserByUsername = async (username: string) => {
  try {
    const findUser = await knex('users').where('username', username);
    const user = findUser[0];
    return user;
  } catch (error) {
    console.error(error);
  }
};

//! add expires at and last used
export const dbAddRefreshToken = async (token: string, user_id: string) => {
  try {
    return await knex('tokens').insert({
      token,
      created_at: Date.now(),
      user_id,
    });
  } catch (error) {
    console.error(error);
  }
};
