<template>
  <div class="home-view">
    <header>
      <h1>Welcome to Smell-Fishy</h1>
      <p>Choose a game to play:</p>
    </header>
    <main>
      <div class="games">
        <GameCard
          title="Tic-Tac-Toe"
          description="A classic game of Xs and Os"
          @select="goToGame('tic-tac-toe')"
        />
        <GameCard
          title="Battle Ship"
          description="Sink your opponent's fleet"
          @select="goToGame('battleship')"
        />
      </div>
    </main>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'

export default {
  name: 'HomeView',
  components: {
    GameCard
  },
  methods: {
    goToGame(game) {
      this.$router.push({ name: game });
    }
  }
};
</script>

<style>
.home-view {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

.games {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>