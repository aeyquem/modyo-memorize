<template>
  <div class="score-board">
    <span>Right: {{ score.right }}</span>
    <span>|</span>
    <span>Wrong: {{ score.wrong }}</span>
  </div>
</template>
<script setup>
defineProps({
  score: {
    right: Number,
    wrong: Number,
  },
});
</script>
<style scoped>
.score-board {
  display: flex;
  justify-content: space-evenly;
  gap: 24px;
  border: 2px solid blue;
  border-bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
