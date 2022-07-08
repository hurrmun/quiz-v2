import { validate } from 'class-validator';
import Koa from 'koa';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/authToken';
import {
  dbCreateUser,
  dbFindUserByEmail,
  dbFindUserByUsername,
} from '../services/dbaccess';
import { UserAccount } from '../utils/validation';

export const registerUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    const user = new UserAccount();
    user.email = ctx.request.body.email;
    user.username = ctx.request.body.username;
    user.password = ctx.request.body.password;

    //* Validate the request body
    const validationOptions = {};
    const errors = await validate(user, validationOptions);

    if (errors.length > 0) {
      ctx.body = {
        message: 'account validation failed',
        errors: errors,
      };
      return ctx.throw(400, 'account validation failed');
    }

    //* Check for existing user with same details
    const userByEmail = await dbFindUserByEmail(user.email);
    if (user.email === userByEmail?.email) {
      ctx.body = {
        message: 'email already exists',
      };
      return ctx.throw(500, 'email already exists');
    }

    const userByUsername = await dbFindUserByUsername(user.username);
    if (user.username === userByUsername?.username) {
      ctx.body = {
        message: 'username already exists',
      };
      return ctx.throw(500, 'username already exists');
    }

    //* Add user to db
    await dbCreateUser(user);
    const createdUser = await dbFindUserByEmail(user.email);

    //* Create Token
    const accessToken = await generateAccessToken(createdUser);
    // const refreshToken = generateRefreshToken(createdUser)

    //* return body
    ctx.body = {
      user: {
        user_id: createdUser.user_id,
        email: createdUser.email,
        username: createdUser.username,
      },
      accessToken,
      // refreshToken,
    };
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    ctx.body = {
      message: 'created',
    };
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    ctx.body = {
      message: 'created',
    };
  } catch (error) {
    console.error(error);
  }
};

export const viewUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    ctx.body = {
      message: 'created',
    };
  } catch (error) {
    console.error(error);
  }
};

export const token = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    ctx.body = {
      message: 'created',
    };
  } catch (error) {
    console.error(error);
  }
};
