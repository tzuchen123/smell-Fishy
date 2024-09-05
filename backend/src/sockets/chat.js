module.exports = (io, socket) => {
    // 監聽加入房間的事件
    socket.on('join-room', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);

        // 通知房間內的其他用戶有新用戶加入
        socket.to(roomName).emit('user-joined', `User ${socket.id} joined the room`);
    });

    // 監聽離開房間的事件
    socket.on('leave-room', (roomName) => {
        socket.leave(roomName);
        console.log(`User ${socket.id} left room: ${roomName}`);

        // 通知房間內的其他用戶有用戶離開
        socket.to(roomName).emit('user-left', `User ${socket.id} left the room`);
    });

    // 處理來自房間內的消息
    socket.on('send-message', ({ roomName, message }) => {
        io.to(roomName).emit('receive-message', { user: socket.id, message });
    });

};