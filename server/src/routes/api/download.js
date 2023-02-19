import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname } from 'node:path';
import { contentType } from 'mime-types';
import archiver from 'archiver';
import Router from '@koa/router';
import { config } from '#config.js';
import { parseParams } from '#utils.js';

const router = new Router();

router.get('/downloadzip/:path', async (ctx) => {
  const [alias, parsePath] = parseParams(ctx.params.path);
  const publicDir = config.publicDirs.find((dir) => dir.alias === alias);
  if (!publicDir) {
    throw new Error('Incorrect public folder');
  }
  const pathToDir = `${publicDir.path}/${parsePath}`;
  const fileName = parsePath.split('/').pop();

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.directory(pathToDir, false);
  archive.finalize();

  ctx.set({
    'Content-Type': 'application/zip',
    'Content-disposition': `attachment; filename=${encodeURIComponent(
      fileName
    )}.zip`,
  });

  ctx.body = archive;
});

router.get('/download/:path', async (ctx) => {
  try {
    const [alias, parsePath] = parseParams(ctx.params.path);
    const publicDir = config.publicDirs.find((dir) => dir.alias === alias);
    if (!publicDir) {
      throw new Error('Incorrect public folder');
    }
    const pathToFile = `${publicDir.path}/${parsePath}`;
    const statFile = await stat(pathToFile);
    const fileName = parsePath.split('/').pop();

    const total = statFile.size;

    ctx.set({
      'Content-Length': total,
      'Content-Type': contentType(extname(pathToFile)),
      'Content-disposition': `attachment; filename=${encodeURIComponent(
        fileName
      )}`,
    });

    ctx.status = 200;
    ctx.body = createReadStream(pathToFile);
  } catch (error) {
    throw error;
  }
});

export default router;
