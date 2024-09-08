const express = require('express');
const router = express.Router();

// 其他主路由
router.get('/', (req, res) => {
    res.send('Welcome to the Game Room!');
});


module.exports = router;
