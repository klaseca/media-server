const { spawn } = require('child_process');
const { readdir, mkdir, copyFile } = require('fs/promises');
const { resolve } = require('path');

const copyDir = async (src, dest) => {
  await mkdir(dest, { recursive: true });
  let entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);

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

    taskProcess.on('close', () => resolve());
    taskProcess.on('error', (error) => reject(error));
  });
};

const build = async () => {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  const tasks = [
    {
      command,
      args: ['run', 'build'],
      options: { cwd: resolve(__dirname, 'client') },
      name: 'client',
    },
    {
      command,
      args: ['run', 'build'],
      options: { cwd: resolve(__dirname, 'server') },
      name: 'server',
    },
  ];

  await Promise.all(tasks.map((task) => run(task)));

  await copyDir(
    resolve(__dirname, 'server/build'),
    resolve(__dirname, 'appbuild')
  );

  await copyDir(
    resolve(__dirname, 'client/build'),
    resolve(__dirname, 'appbuild/static')
  );
};

build().catch((error) => console.error(error));
