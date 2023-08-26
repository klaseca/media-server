import { createServer } from 'node:http';
import 'dotenv/config.js';
import app from '#app.js';
import { config } from '#config.js';
import { getNetworkAddresses, makeUrl } from '#utils.js';

const PROTOCOL = 'http';

const ADDRESS = undefined;

const { port } = config;

createServer(app.callback()).listen(port, ADDRESS, () => {
  console.log(`Server started, UwU (${makeUrl(PROTOCOL, ADDRESS, port)})`);

  getNetworkAddresses().forEach((address) =>
    console.log('Network:', makeUrl(PROTOCOL, address, port))
  );
});
