import { createServer } from 'node:http';
import 'dotenv/config.js';
import app from '#app.js';
import { config } from '#config.js';

const { port } = config;

createServer(app.callback()).listen(port, () => {
  console.log(`Server started, UwU (port: ${port})`);
});
