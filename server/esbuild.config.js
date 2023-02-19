import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { createCodeRunner } from './codeRunner.js';

const isProd = process.env.NODE_ENV === 'production';

const defineEnvVariables = ['NODE_ENV', 'PORT'].reduce(
  (vals, val) =>
    Object.assign(vals, {
      [`process.env.${val}`]: JSON.stringify(process.env[val]),
    }),
  {}
);

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
  outdir: resolve('build'),
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
  absWorkingDir: resolve('src'),
  write: isProd,
  incremental: !isProd,
  metafile: isProd,
  define: Object.assign(
    { 'import.meta.url': 'importMetaUrl' },
    defineEnvVariables
  ),
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
