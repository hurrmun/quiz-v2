//* DEPENDENCIES
import Koa from 'koa';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import { config } from './src/configs/config';

//* IMPORT ROUTES
import userRoutes from './src/routes/users';

//* CONFIG
const app = new Koa();
const PORT = config.port;

//* ROUTER MIDDLEWARE
const apiRoutes = new Router({ prefix: '/api' });

apiRoutes.use(userRoutes.routes());

//* MIDDLEWARE
app
  .use(bodyParser())
  .use(
    cors({
      origin: '*',
    })
  )
  .use(koaLogger())
  .use(apiRoutes.routes())
  .use(apiRoutes.allowedMethods());

//* LISTENER
const server = app
  .listen(PORT, async () => {
    console.log(
      `server is listening on: ${PORT}. Go to http://localhost:${PORT}`
    );
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
