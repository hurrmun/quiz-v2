import * as Router from 'koa-router';
const router: Router = new Router();

router.get('/test', async function test(ctx) {
  ctx.body = { message: 'hello' };
});
