const { resolve } = require('path');
const { writeFile } = require('fs/promises');
const { build } = require('esbuild');

const isProd = process.env.NODE_ENV === 'production';

const absWorkingDir = resolve(__dirname, 'src');

const outdir = resolve(__dirname, 'build');

let server;

const watch = isProd
  ? false
  : {
      onRebuild(error, result) {
        if (error) {
          console.error('\nWatch build failed:', error);
        } else {
          console.log('\nWatch build succeeded');
          const { text } = result.outputFiles[0];
          server.close();
          server = eval(text);
        }
      },
    };

build({
  entryPoints: ['server.js'],
  outdir,
  bundle: true,
  minify: isProd,
  platform: 'node',
  watch,
  absWorkingDir,
  write: isProd,
  incremental: !isProd,
  metafile: isProd,
})
  .then(async (result) => {
    console.log('Build succeeded');
    if (!isProd) {
      server = eval(result.outputFiles[0].text);
    } else {
      await writeFile('meta.json', JSON.stringify(result.metafile, null, 2));
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1)
  });
