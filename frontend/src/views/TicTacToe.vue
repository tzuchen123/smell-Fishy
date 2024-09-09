<template>
  <div class="tic-tac-toe">
    <h1>Tic-Tac-Toe</h1>

    <input v-model="roomName" placeholder="輸入房間名稱" :disabled="created" />
    <button @click="createRoom" :disabled="created">Create Room</button>
    <button @click="joinRoom" :disabled="created">Join Room</button>
    <button @click="leaveRoom">Leave Room</button>

    <div v-if="startd">
      <h2>Room Name: {{ roomName }}</h2>
      <h2>You are: {{ player }}</h2>
      <h2>Current Player: {{ currentPlayer }}</h2>
      <div class="board">
        <div v-for="(cell, index) in board" :key="index" class="cell"
          :class="{ disabled: cell !== null, removed: index === removedIndex }" @click="makeMove(index)">
          {{ cell }}
        </div>
      </div>
      <p v-if="winner">Winner: {{ winner }}</p>
    </div>

    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomName: '',
      created: false,
      startd: false,
      board: null,
      player: '',
      currentPlayer: '',
      winner: null,
      message: '',
      removedIndex: null,
    };
  },
  methods: {
    createRoom() {
      if (this.roomName) {
        this.$socket.emit('createRoom', this.roomName);
        this.created = true;
      }
    },
    joinRoom() {
      if (this.roomName) {
        this.$socket.emit('joinRoom', this.roomName);
        this.created = true;
      }
    },
    leaveRoom() {
      if (this.roomName) {
        this.$socket.emit('leaveRoom', this.roomName);
        this.roomName = '';
        this.created = false;
        this.startd = false;
        this.board = null;
        this.player = '';
        this.currentPlayer = '';
        this.winner = null;
        this.removedIndex = null;
        this.message = 'Leave Room Successfully';
      }
    },
    makeMove(index) {
      if (this.board[index] === null && !this.winner && this.player === this.currentPlayer) {
        this.board[index] = this.player;
        if (this.removedIndex !== null) {
          this.board[this.removedIndex] = null;
        }
        this.$socket.emit('makeMove', this.roomName, index, this.removedIndex, this.player);
      }

    },
  },
  mounted() {
    this.$socket.on('message', (message) => {
      this.message = message;
    });

    this.$socket.on('userLeft', (message) => {
      this.startd = false;
      this.board = null;
      this.message = message;
    });

    this.$socket.on('roomJoined', ({ player }) => {
      this.player = player;
      this.$socket.emit('startGame', this.roomName);
    });

    this.$socket.on('gameStarted', ({ board, currentPlayer }) => {
      this.currentPlayer = currentPlayer;
      this.board = board;
      this.startd = true;
      this.message = '';
    });

    this.$socket.on('moveMade', (game) => {
      this.board = game.board;
      this.currentPlayer = game.currentPlayer;
      this.removedIndex = game.removedIndex;
    });

    this.$socket.on('gameOver', ({ winner }) => {
      if (winner === 'A' || winner === 'B') {
        // 如果有明确的胜利者 'A' 或 'B'
        alert(`玩家 ${winner} 獲勝了！`);
        // 你可以在這裡添加更多的邏輯，例如重置遊戲狀態或導航到另一個頁面
        this.leaveRoom();
      }
    });

  },
};
</script>

<style scoped>
.tic-tac-toe {
  text-align: center;
  font-family: Arial, sans-serif;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  justify-content: center;
  margin: 20px auto;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border: 2px solid #ccc;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
}

.cell:hover {
  background-color: #e0e0e0;
}

.cell.playerX {
  background-color: lightblue;
}

.cell.playerO {
  background-color: lightcoral;
}

.cell.removed {
  background-color: gray;
}

input {
  margin: 20px;
  padding: 10px 20px;
  font-size: 1rem;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;
}
</style>