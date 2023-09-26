<template>
  <figure>
    <img v-if="isFlipped" :src="card.src" :alt="card.slug" :title="card.slug" />
    <img v-else class="card__background" />
  </figure>
</template>

<script setup>
defineProps({
  card: {
    src: String,
    slug: String,
  },
  isFlipped: Boolean,
});
</script>

<style>
img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 3px;
  padding: 2px;
}

.card__background {
  background-image: url('@/assets/card.webp');
}
</style>
