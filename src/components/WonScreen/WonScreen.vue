<template>
  <div class="won__container">
    <p>Congrats!!</p>
    <h2>🥳🥳You won!!!🥳🥳</h2>
    <p>It took you {{ score.wrong }} tries to get the {{ score.right }} cards right!</p>
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
