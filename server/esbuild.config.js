import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { createCodeRunner } from './codeRunner.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const isProd = process.env.NODE_ENV === 'production';

const absWorkingDir = resolve(__dirname, 'src');

const outdir = resolve(__dirname, 'build');

const codeRunner = createCodeRunner();

const watch = isProd
  ? false
  : {
      onRebuild(error, result) {
        if (error) {
          console.error('\nWatch build failed:', error);
        } else {
          console.log('\nWatch build succeeded');
          codeRunner.run(result.outputFiles[0].text);
        }
      },
    };

build({
  entryPoints: ['server.js'],
  outdir,
  outExtension: {
    '.js': '.cjs',
  },
  alias: {
    'src/*': '#*',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  minify: isProd,
  watch,
  absWorkingDir,
  write: isProd,
  incremental: !isProd,
  metafile: isProd,
  define: { 'import.meta.url': 'importMetaUrl' },
  inject: ['import-meta-url-shim.js'],
})
  .then(async (result) => {
    console.log('Build succeeded');
    if (!isProd) {
      codeRunner.run(result.outputFiles[0].text);
    } else {
      await writeFile('meta.json', JSON.stringify(result.metafile, null, 2));
    }
  })
  .catch((error) => {
    console.error(error);
  });
