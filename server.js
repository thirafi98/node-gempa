const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));
const portListen = 8080;
server.listen(portListen);
console.log("Terhubung pada ", portListen);

