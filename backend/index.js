const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');
const routes = require('./src/routes'); // 引入路由
const sockets = require('./src/sockets'); // 引入 Socket.IO 服务器
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 配置 CORS
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || '*',
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));

// 中間件
app.use(express.json());

// 路由
// app.use('/', routes);

// 引入 Socket.IO 服务器
sockets(server);

app.use(express.static(path.join(__dirname, 'public')));
// 捕捉所有未匹配的路由，並返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
