<template>
  <div class="won__container">
    <p>Congrats!!</p>
    <h2>🥳🥳You won!!!🥳🥳</h2>
    <p>It took you {{ game.score.wrong }} tries to get the {{ game.score.right }} cards right!</p>
    <br />
    <button type="button" @click.prevent="resetGame">Play again!</button>
  </div>
</template>
<script setup>
import { useGameStore } from '@/stores/game.store';

const game = useGameStore();

function resetGame() {
  game.resetGame();
}
</script>
<style scoped>
h2 {
  font-size: 2rem;
  font-weight: 600;
}
.won__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: beige;
  border-radius: 5px;
}
</style>
