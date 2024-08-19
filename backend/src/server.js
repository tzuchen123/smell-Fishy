require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('../frontend/dist')); // 這裡將前端打包後的文件設置為靜態資源

// 示例路由
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to Battleship API" });
});

// Socket.io連線
io.on('connection', (socket) => {
    console.log('A user connected');

    // 示例事件處理
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
