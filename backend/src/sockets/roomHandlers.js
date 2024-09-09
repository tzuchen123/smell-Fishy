const rooms = {};

module.exports = (io, socket) => {
    socket.on('createRoom', (roomName) => {
        if (rooms[roomName]) {
            socket.emit('message', 'Room already exists.');
            return;
        }
        // 初始化房間資料
        rooms[roomName] = {
            players: {
                A: socket.id, // 創建者是先手
                B: null
            }
        };

        socket.join(roomName);
        console.log(`Room ${roomName} created by ${socket.id} as Player A`);

        socket.emit('message', 'Room created successfully. Please wait until someone joins.');
    });


    socket.on('joinRoom', (roomName) => {
        const room = rooms[roomName];

        if (room && room.players.B === null) {
            room.players.B = socket.id; // 加入者是 Player "X"
            socket.join(roomName);
            console.log(`User ${socket.id} joined room ${roomName} as Player B`);

            // 通知創建者 (Player A)
            io.to(room.players.A).emit('roomJoined', {
                player: 'A',
            });

            io.to(room.players.B).emit('roomJoined', {
                player: 'B',
            });

        } else if (!room) {
            socket.emit('message', 'Room does not exist.');
        } else {
            socket.emit('message', 'Room is full.');
        }
    });

    // 監聽離開房間的事件
    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);
        console.log(`User ${socket.id} left room: ${roomName}`);

        // 通知房間內的其他用戶有用戶離開
        socket.to(roomName).emit('userLeft', `User ${socket.id} left the room`);
    });
};

