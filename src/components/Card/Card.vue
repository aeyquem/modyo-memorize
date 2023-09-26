<template>
  <figure class="w-24 h-36 border-[1px] border-white-200 rounded-lg">
    <img
      v-if="isFlipped"
      :src="card.src"
      :alt="card.slug"
      :title="card.slug"
      class="w-full h-full object-cover rounded-lg"
    />
    <img v-else class="bg-[url('@/assets/card.webp')] w-full h-full rounded-lg" />
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
