import Router from '@koa/router';
import stream from './stream.js';
import content from './content.js';
import download from './download.js';

const apiRouter = new Router();

const nestedRoutes = [content, stream, download];

nestedRoutes.forEach((router) => {
  apiRouter.use(router.routes(), router.allowedMethods());
});

export default apiRouter;
