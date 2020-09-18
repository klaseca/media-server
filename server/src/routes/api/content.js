const { readdir } = require('fs/promises');
const Router = require('@koa/router');
const { publicDirs } = require('./../../config/config');
const { parseParams } = require('./../../utils');

const router = new Router({ prefix: '/content' });

router.get('/', async (ctx) => {
  const containers = publicDirs.map(({ alias }) => ({
    name: alias,
    isDir: true,
  }));
  ctx.body = containers;
});

router.get('/:path', async (ctx) => {
  const [alias, parsePath] = parseParams(ctx.params.path);
  const { path } = publicDirs.find((dir) => dir.alias === alias);
  const pathToDir = `${path}/${parsePath}`;
  const dirents = await readdir(pathToDir, { withFileTypes: true });
  const contents = dirents.map((content) => {
    const isDir = content.isDirectory() ? true : false;
    return {
      ...content,
      isDir,
    };
  });
  ctx.body = contents;
});

module.exports = router;
