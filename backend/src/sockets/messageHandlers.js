module.exports = (io, socket) => {
    // 處理來自房間內的消息
    socket.on('sendMessage', ({ roomName, message }) => {
        io.to(roomName).emit('receive-message', { user: socket.id, message });
    });

};