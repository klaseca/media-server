import Koa from 'koa';
import cors from '@koa/cors';
import serve from 'koa-static';
import { resolve } from 'path';
import { createReadStream } from 'fs';
import apiRouter from 'routes/api/apiRouter';

const isProd = process.env.NODE_ENV === 'production' ? true : false;

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

app.use(cors());

if (isProd) {
  const staticFiles = resolve(__dirname, 'static');

  app.use(serve(staticFiles));

  app.use(async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream(resolve(staticFiles, 'index.html'));
    await next();
  });
}

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

export default app;
