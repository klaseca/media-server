import { spawn } from 'node:child_process';
import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const copyDir = async (src, dest) => {
  await mkdir(dest, { recursive: true });

  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);

    const destPath = join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await copyFile(srcPath, destPath);
  }
};

const run = ({ command, args, options, name }) => {
  return new Promise((resolve, reject) => {
    const taskProcess = spawn(command, args, options);

    taskProcess.stdout.on('data', (data) => {
      console.log(`${name}: ${data}`);
    });

    taskProcess.on('close', resolve);

    taskProcess.on('error', reject);
  });
};

const build = async () => {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  const tasks = [
    {
      command,
      args: ['run', 'build:client'],
      name: 'client',
    },
    {
      command,
      args: ['run', 'build:server'],
      name: 'server',
    },
  ];

  await Promise.all(tasks.map(run));

  await copyDir(
    join(__dirname, 'apps/server/dist'),
    join(__dirname, 'appbuild')
  );

  await copyDir(
    join(__dirname, 'apps/client/dist'),
    join(__dirname, 'appbuild/static')
  );
};

build().catch(console.error);
