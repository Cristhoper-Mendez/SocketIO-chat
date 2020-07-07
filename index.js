const path = require('path')
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

//STATIC
app.use(express.static(path.join(__dirname, 'public')))

//SERVER
const server = app.listen(app.get('port'), () => {
    console.log('serve on port', app.get('port'));
});

const socketio = require('socket.io');
const io = socketio(server)
//socket
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        //console.log(data);
        socket.broadcast.emit('chat:typing', data);
    });
});


