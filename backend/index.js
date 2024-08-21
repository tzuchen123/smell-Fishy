const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config(); // 使用 dotenv 來管理環境變量

const app = express();
const server = http.createServer(app);

// 配置 CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || '*',
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));

const io = new Server(server, { cors: corsOptions });

// 中間件
app.use(express.json());

// 路由
app.get('/', (req, res) => {
  res.send('Socket.io Server is running');
});

// Socket.IO 事件處理
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('message', (message) => {
    console.log('Message from client:', message);
    io.emit('message', `Server: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
