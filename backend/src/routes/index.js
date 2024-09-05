const express = require('express');
const router = express.Router();
// const gameRoutes = require('./gameRoutes');

// // 使用遊戲相關的路由
// router.use('/games', gameRoutes);

// 其他主路由
router.get('/', (req, res) => {
    res.send('Welcome to the Game Room!');
});


module.exports = router;
