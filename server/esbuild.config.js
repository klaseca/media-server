import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { createCodeRunner } from './codeRunner.js';

const isProd = process.env.NODE_ENV === 'production';

const envVariables = ['NODE_ENV', 'PORT'].reduce((vals, val) => {
  const envVal = process.env[val];

  if (envVal != null) {
    vals[`process.env.${val}`] = JSON.stringify(process.env[val]);
  }

  return vals;
}, {});

const createRequirePath = isProd ? 'import.meta.url' : `'${import.meta.url}'`;

const importMetaUrlShim = isProd
  ? ''
  : `var importMetaUrl = '${import.meta.url}';`;

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
  entryPoints: ['./server.js'],
  outdir: fileURLToPath(new URL('./build', import.meta.url)),
  outExtension: {
    '.js': '.mjs',
  },
  alias: {
    'src/*': '#*',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  minify: isProd,
  watch,
  absWorkingDir: fileURLToPath(new URL('./src', import.meta.url)),
  write: isProd,
  incremental: !isProd,
  metafile: isProd,
  banner: {
    js: `${importMetaUrlShim}var require = (await import('node:module')).createRequire(${createRequirePath});`,
  },
  define: Object.assign(
    {},
    Boolean(importMetaUrlShim) && { 'import.meta.url': 'importMetaUrl' },
    envVariables
  ),
})
  .then(async (result) => {
    console.log('Build succeeded');
    if (!isProd) {
      codeRunner.run(result.outputFiles[0].text);
    } else {
      await writeFile('meta.json', JSON.stringify(result.metafile, null, 2));
    }
  })
  .catch(console.error);
