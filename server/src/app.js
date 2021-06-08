import Koa from 'koa';
import cors from '@koa/cors';
import serve from 'koa-static';
import mount from 'koa-mount';
import { resolve } from 'path';
import apiRouter from 'routes/api/apiRouter';

const isDev = process.env.NODE_ENV === 'development' ? true : false;

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (error) => {
  if (error.code === 'ECONNRESET') {
    console.log('Stream ended');
  } else {
    console.error('Koa app-level error', { error });
  }
});

if (!isDev) {
  const staticPages = new Koa();

  staticPages.use(serve(resolve(__dirname, 'static')));

  app.use(mount('/', staticPages));
}

app.use(cors());

app.use(apiRouter.routes(), apiRouter.allowedMethods());

export default app;
