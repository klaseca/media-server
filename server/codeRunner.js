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

      node.on('error', (code) => console.error('alo', code));
    },
    stop() {
      node?.kill();
    },
  };
};
