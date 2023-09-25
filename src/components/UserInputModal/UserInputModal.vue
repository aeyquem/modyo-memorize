<template>
  <form>
    <label for="playerName">Your name:</label>
    <input id="playerName" type="text" placeholder="Write your name please" />
    <br />
    <input type="button" @click.prevent="handleClick" value="Continue to game" />
  </form>
</template>
<script setup>
defineProps({
  visible: Boolean,
});
const emit = defineEmits(['playerNamed']);
function handleClick() {
  //validate name
  emit('playerNamed');
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
