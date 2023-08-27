import { spawn } from 'node:child_process';

export const createCodeRunner = () => {
  let node;

  return {
    run(code) {
      this.stop();

      node = spawn('node', ['--input-type=module'], {
        stdio: ['pipe', 'inherit', 'inherit'],
      });

      node.stdin.end(code);

      node.on('error', console.error);
    },
    stop() {
      node?.kill();
    },
  };
};
