const { Server } = require('socket.io');
const chat = require('./chat');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS || '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    // Socket.IO 事件處理
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        chat(io, socket);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

};