import { readdir } from 'node:fs/promises';
import Router from '@koa/router';
import { config } from '#config.js';
import { parseParams, sortContents } from '#utils.js';

const router = new Router({ prefix: '/content' });

router.get('/', async (ctx) => {
  const contents = config.publicDirs.map(({ alias }) => ({
    name: alias,
    isDir: true,
  }));

  ctx.body = sortContents(contents);
});

router.get('/:path', async (ctx) => {
  const [alias, parsePath] = parseParams(ctx.params.path);

  const publicDir = config.publicDirs.find((dir) => dir.alias === alias);

  if (!publicDir) {
    throw new Error('Incorrect public folder');
  }

  const pathToDir = `${publicDir.path}/${parsePath}`;

  const dirents = await readdir(pathToDir, { withFileTypes: true });

  const contents = dirents.map((content) => ({
    ...content,
    isDir: content.isDirectory(),
  }));

  ctx.body = sortContents(contents);
});

export default router;
