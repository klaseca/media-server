import { readdir } from 'fs/promises';
import Router from '@koa/router';
import { publicDirs } from 'config/config';
import { parseParams } from 'utils';
import { orderBy } from 'lodash';

const router = new Router({ prefix: '/content' });

router.get('/', async (ctx) => {
  const contents = publicDirs.map(({ alias }) => ({
    name: alias,
    isDir: true,
  }));
  const sortContents = orderBy(contents, ['isDir', 'name'], ['desc', 'asc']);
  ctx.body = sortContents;
});

router.get('/:path', async (ctx) => {
  const [alias, parsePath] = parseParams(ctx.params.path);
  const publicDir = publicDirs.find((dir) => dir.alias === alias);
  if (!publicDir) {
    throw new Error('Incorrect public folder');
  }
  const pathToDir = `${publicDir.path}/${parsePath}`;
  const dirents = await readdir(pathToDir, { withFileTypes: true });
  const contents = dirents.map((content) => {
    const isDir = content.isDirectory() ? true : false;
    return {
      ...content,
      isDir,
    };
  });
  const sortContents = orderBy(contents, ['isDir', 'name'], ['desc', 'asc']);
  ctx.body = sortContents;
});

export default router;
