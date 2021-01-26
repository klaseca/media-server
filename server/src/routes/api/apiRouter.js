import Router from '@koa/router';
import stream from './stream';
import content from './content';
import download from './download';

const apiRouter = new Router();

const nestedRoutes = [content, stream, download];

nestedRoutes.forEach((router) => {
  apiRouter.use(router.routes(), router.allowedMethods());
});

export default apiRouter;
