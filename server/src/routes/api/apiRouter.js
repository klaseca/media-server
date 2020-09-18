const Router = require('@koa/router');
const stream = require('./stream');
const content = require('./content');
const download = require('./download');

const apiRouter = new Router();

const nestedRoutes = [content, stream, download];

nestedRoutes.forEach((router) => {
  apiRouter.use(router.routes(), router.allowedMethods());
});

module.exports = apiRouter;
