<template>
  <div class="game-card" @click="$emit('select')">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    title: String,
    description: String
  }
}
</script>

<style scoped>
.game-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s;
}

.game-card:hover {
  transform: scale(1.05);
}
</style>
