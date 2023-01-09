import { createServer } from 'node:http';
import 'dotenv/config.js';
import app from '#app.js';

const port = process.env.PORT || 3232;

createServer(app.callback()).listen(port, () => {
  console.log(`Server started, UwU (port: ${port})`);
});
