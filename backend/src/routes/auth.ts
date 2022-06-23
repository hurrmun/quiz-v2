const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/test', async function test(ctx) {
  await ctx.render('index', { title: 'test' });
});
