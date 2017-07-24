var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 4000;
// App setup
var app = express();
var server = app.listen(PORT, () => { console.log('Application run on PORT: ' + PORT )});

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});