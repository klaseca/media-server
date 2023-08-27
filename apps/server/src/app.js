import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Koa from 'koa';
import cors from '@koa/cors';
import serve from 'koa-static';
import apiRouter from '#routes/api/apiRouter.js';
import { config } from '#config.js';

const isProd = config.env === 'production';

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
  const staticFiles = join(
    fileURLToPath(new URL('.', import.meta.url)),
    'static'
  );

  app.use(serve(staticFiles));

  app.use(async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream(join(staticFiles, 'index.html'));
    await next();
  });
}

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

export default app;
