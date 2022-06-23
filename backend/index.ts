//* DEPENDENCIES
require('dotenv').config({ path: './config.env' });

import * as Koa from 'koa';
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

// const json = require('koa-json');
// const bodyParser = require('koa-bodyparser');

//* CONFIG
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();
const PORT = process.env.PORT || 3000;

//* MIDDLEWARE
// app.use(json());
// app.use(bodyParser());
// app.use(router.routes()).use(router.allowedMethods());

//* ROUTES
// app.use('/api/auth', require('./src/routes/auth'));
router.get(
  '/',
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: 'hello world' };
  }
);

app.use(router.routes()).use(router.allowedMethods());

//* LISTENER
app
  .listen(PORT)
  .on('listening', () =>
    console.log(
      `server started on port: ${PORT}. go to http://localhost:${PORT}`
    )
  );
