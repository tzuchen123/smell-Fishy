<template>
  <div class="tic-tac-toe">
    <h1>Tic-Tac-Toe</h1>
    <div class="board">
      <div v-for="(cell, index) in board" :key="index" class="cell" @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>



    
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: Array(9).fill(""),
      currentPlayer: "X",
    };
  },
  computed: {

  },
  methods: {
    makeMove(index) {
      // 检查格子是否为空
      if (this.board[index] === "") {
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        // 检查游戏是否结束
        if (this.checkWin()) {
          alert(`${this.currentPlayer} wins!`);
        }
      }
    },
    checkWin(){

    }
  }
  
};
</script>

<style>
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

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>