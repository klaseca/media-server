const Koa = require('koa');
const cors = require('@koa/cors');
const serve = require('koa-static');
const mount = require('koa-mount');
const { resolve } = require('path');
const apiRouter = require('./routes/api/apiRouter');

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

  staticPages.use(serve(resolve(__dirname, './../../client/build')));

  app.use(mount('/', staticPages));
}

app.use(cors());

app.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = app;
