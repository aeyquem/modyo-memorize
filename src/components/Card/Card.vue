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
  background: repeating-radial-gradient(
      circle,
      transparent,
      transparent 17.5px,
      #000000 17.5px,
      #000000 22.5px
    ),
    repeating-radial-gradient(
      circle,
      transparent,
      transparent 17.5px,
      #000000 17.5px,
      #000000 22.5px
    ),
    #000f78;
  background-size: 100px 100px;
  background-position:
    0 0,
    50px 50px,
    100px 50px;
  background-color: #000f78;
}
</style>
