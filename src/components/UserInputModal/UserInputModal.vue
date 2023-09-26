<template>
  <form @submit.prevent="submit">
    <label for="playerName">Your name: </label>
    <input
      id="playerName"
      name="playerName"
      type="text"
      placeholder="Write your name please"
      v-model.trim.lazy="inputName"
      required
    />
    <br />
    <input type="submit" id="btn_submit" name="btn_submit" value="Continue to game" />
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { usePlayerStore } from '@/stores/player.store';

const player = usePlayerStore();
const inputName = ref('');

function submit() {
  player.playerName = inputName.value;
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 20rem;
  gap: 0.2rem;

  padding: 4rem;
  background-color: rgb(202, 255, 188);
  border-radius: 5px;
}
</style>
