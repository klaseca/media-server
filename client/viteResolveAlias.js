import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, readdirSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const replaceExt = ['jsx', 'js'];

const regex = new RegExp(`(?:.(?:${replaceExt.join('|')}))$`);

const config = JSON.parse(
  readFileSync(fileURLToPath(new URL('./jsconfig.json', import.meta.url)))
);

const baseUrl = resolve(__dirname, config.compilerOptions.baseUrl);

export const aliases = readdirSync(baseUrl, { withFileTypes: true })
  .map((dirent) => dirent.name.replace(regex, ''))
  .reduce((acc, directory) => {
    acc[directory] = join(baseUrl, directory);
    return acc;
  }, {});
