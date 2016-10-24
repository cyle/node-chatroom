// load up our dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// config options
var chat_port = 31337;

// deal with the index file
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

// handle any static assets, just serve em straight up
app.use(express.static('www'));

// handle new collections
io.on('connection', function(socket) {
    console.log('a user connected!');

    // do something on disconnect?
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    // do something when a message is sent
    socket.on('chat message', function(msg) {
        if (msg.content === undefined || msg.content === '') {
            return; // don't do nothin
        }

        // if no name was given, fall back to "anon"
        if (msg.name === undefined || msg.name === '') {
            msg.name = 'anon';
        }

        console.log('message: ', msg);

        // emit the message to all other sockets
        io.emit('chat message', msg);
    });
});

// cool, let's listen for new clients
http.listen(chat_port, function() {
    console.log('listening on *:' + chat_port);
});
