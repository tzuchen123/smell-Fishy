const { Server } = require('socket.io');
const roomHandlers = require('./roomHandlers');
const messageHandlers = require('./messageHandlers');
const TicTacToe = require('./TicTacToe');

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

        // 註冊房間相關的處理邏輯
        roomHandlers(io, socket);

        // 註冊訊息相關的處理邏輯
        messageHandlers(io, socket);

        TicTacToe(io, socket);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

};