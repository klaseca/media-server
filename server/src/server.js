import dotenv from 'dotenv'
import { createServer } from 'http';
import app from 'app';

dotenv.config();

createServer(app.callback()).listen(process.env.PORT, () => {
  console.log('Server started, UwU');
});
