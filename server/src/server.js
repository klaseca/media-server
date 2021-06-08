import 'dotenv/config';
import { createServer } from 'http';
import app from 'app';

createServer(app.callback()).listen(process.env.PORT, () => {
  console.log('Server started, UwU');
});
