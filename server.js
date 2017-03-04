const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
// Get configuration
const cfg = require('./config/config.js');

// handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  next();
});
// bodyparser settings
app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));



/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(normalizePort(cfg.port));
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') throw error;

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on: ' + bind);
}
