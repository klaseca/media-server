import 'dotenv/config';
import { createServer } from 'http';
import app from 'app';

const port = process.env.PORT || 3232;

createServer(app.callback()).listen(port, () => {
  console.log(`Server started, UwU (port: ${port})`);
});
