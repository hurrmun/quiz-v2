//* DEPENDENCIES
// require('dotenv').config({ path: './config.env' });
import { config } from 'dotenv';
import * as Koa from 'koa';
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import * as Router from 'koa-router';

config();

// const json = require('koa-json');
// const bodyParser = require('koa-bodyparser');

//* CONFIG
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();
const port = process.env.PORT || 3000;

//* MIDDLEWARE
// app.use(json());
// app.use(bodyParser());
// app.use(router.routes()).use(router.allowedMethods());

//* ROUTES
// app.use('/api/auth', require('./src/routes/auth'));
router.get(
  '/',
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: 'hello world json' };
  }
);

app.use(router.routes()).use(router.allowedMethods());

//* LISTENER
app
  .listen(port)
  .on('listening', () =>
    console.log(
      `server started on port: ${port}. Go to http://localhost:${port}`
    )
  );
