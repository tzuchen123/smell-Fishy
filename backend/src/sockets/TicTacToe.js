const games = {}; // 用於儲存遊戲狀態

module.exports = (io, socket) => {

    socket.on('startGame', (roomName) => {
        // 初始化房間資料
        games[roomName] = {
            order: [],
            board: Array(9).fill(null), // 初始化 3x3 棋盤
            currentPlayer: 'A' // 初始化先手玩家
        };

        socket.to(roomName).emit('gameStarted', {
            board: games[roomName].board,
            currentPlayer: games[roomName].currentPlayer
        });

    });

    socket.on('makeMove', (roomName, index, removedIndex, player) => {
        const game = games[roomName];
        game.board[index] = player;
        if (removedIndex !== null) {
            game.board[removedIndex] = null;

        }
        game.currentPlayer = player === 'A' ? 'B' : 'A';
        game.order.push(index);

        if (game.order.length > 5) {
            const removedIndex = game.order.shift();
            game.removedIndex = removedIndex
        }

        io.to(roomName).emit('moveMade', game);

        const winner = checkWinner(game.board);
        if (winner) {
            io.to(roomName).emit('gameOver', { winner });
            delete games[roomName]; // 遊戲結束後清除狀態
        }

    });
};

// 簡單的勝利檢查邏輯
function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向
        [0, 4, 8], [2, 4, 6]             // 斜向
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}
