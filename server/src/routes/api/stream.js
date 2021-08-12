import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { extname } from 'path';
import { contentType } from 'mime-types';
import Router from '@koa/router';
import { publicDirs } from 'config/config';
import { parseParams } from 'utils';

const router = new Router();

router.get('/stream/:path', async (ctx) => {
  try {
    const [alias, parsePath] = parseParams(ctx.params.path);
    const publicDir = publicDirs.find((dir) => dir.alias === alias);
    if (!publicDir) {
      throw new Error('Incorrect public folder');
    }
    const pathToFile = `${publicDir.path}/${parsePath}`;
    const statFile = await stat(pathToFile);

    const total = statFile.size;
    const range = ctx.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const partialstart = parts[0];
      const partialend = parts[1];

      const start = +partialstart;
      const end = partialend ? +partialend : total - 1;
      const chunksize = end - start + 1;
      console.log(`RANGE: ${start} - ${end} = ${chunksize}`);

      ctx.set({
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType(extname(pathToFile)),
        Connection: 'keep-alive',
      });

      ctx.status = 206;
      ctx.body = createReadStream(pathToFile, { start, end });
    } else {
      console.log('ALL: ' + total);
      ctx.set({
        'Content-Length': total,
        'Content-Type': contentType(extname(pathToFile)),
        Connection: 'keep-alive',
      });

      ctx.status = 200;
      ctx.body = createReadStream(pathToFile);
    }
  } catch (error) {
    throw error;
  }
});

export default router;
