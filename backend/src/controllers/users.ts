import Koa from 'koa';

export const registerUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  try {
    ctx.body = {
      message: 'created',
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
