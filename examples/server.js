'use strict';

const app = require('./app');
const sockets = require('./sockets');
const http = require('http');

let port = process.env.PORT || 9001;
let httpServer = http.createServer(app);

app.set('port', port);

httpServer.listen(port, () => {
  sockets.connectTo(httpServer);
});
