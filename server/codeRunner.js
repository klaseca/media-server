import { spawn } from 'node:child_process';

export const createCodeRunner = () => {
  let node;

  return {
    run(code) {
      this.stop();

      node = spawn('node', [], {
        stdio: ['pipe', 'inherit', 'inherit'],
      });

      node.stdin.end(code);

      node.on('error', (error) => console.error(error));
    },
    stop() {
      node?.kill();
    },
  };
};
