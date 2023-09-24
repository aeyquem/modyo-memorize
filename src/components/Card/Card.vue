<template>
  <figure @click.prevent="flipCard(card)">
    <img v-if="isFlipped" :src="card.src" :alt="card.slug" :title="card.slug" />
    <img v-else src="https://opengameart.org/sites/default/files/card%20back%20red.png" />
  </figure>
</template>

<script setup>
import { ref } from 'vue';
const isFlipped = ref(false);

const emit = defineEmits(['flipped']);

defineProps({
  card: {
    src: String,
    slug: String,
  },
});

function resetCard() {
  isFlipped.value = false;
}

function flipCard(card) {
  isFlipped.value = !isFlipped.value;
  emit('flipped', { card, resetCard });
}
</script>

<style scoped>
img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}
</style>
