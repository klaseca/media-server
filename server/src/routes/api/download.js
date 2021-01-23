const { stat } = require('fs/promises');
const { createReadStream } = require('fs');
const { extname } = require('path');
const { contentType } = require('mime-types');
const archiver = require('archiver');
const Router = require('@koa/router');
const { publicDirs } = require('./../../config/config');
const { parseParams } = require('./../../utils');

const router = new Router();

router.get('/downloadzip/:path', async (ctx) => {
  const [alias, parsePath] = parseParams(ctx.params.path);
  const { path } = publicDirs.find((dir) => dir.alias === alias);
  const pathToDir = `${path}/${parsePath}`;
  const fileName = parsePath.split('/').pop();

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.directory(pathToDir, false);
  archive.finalize();

  ctx.set({
    'Content-Type': 'application/zip',
    'Content-disposition': `attachment; filename=${encodeURIComponent(fileName)}.zip`,
  });

  ctx.body = archive;
});

router.get('/download/:path', async (ctx) => {
  try {
    const [alias, parsePath] = parseParams(ctx.params.path);
    const { path } = publicDirs.find((dir) => dir.alias === alias);
    const pathToFile = `${path}/${parsePath}`;
    const statFile = await stat(pathToFile);
    const fileName = parsePath.split('/').pop();

    const total = statFile.size;

    ctx.set({
      'Content-Length': total,
      'Content-Type': contentType(extname(pathToFile)),
      'Content-disposition': `attachment; filename=${encodeURIComponent(fileName)}`,
    });

    ctx.status = 200;
    ctx.body = createReadStream(pathToFile);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
