require('dotenv').config();
const { createServer } = require('http');
const app = require('./app');

createServer(app.callback()).listen(process.env.PORT, () => {
  console.log('Server started, UwU');
});

