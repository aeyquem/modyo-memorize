<template>
  <section class="flex justify-center flex-wrap gap-4 max-w-md">
    <Card v-for="card in cards" :key="card.id" :card="card" @flipped="hanldeFlipped" />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Card from './components/Card/Card.vue';

const wonCards = ref(new Set());
const flipped = ref({
  slug: null,
  resetCard: () => {},
});
const score = ref({
  right: 0,
  wrong: 0,
});

let cards = [
  {
    id: 0,
    src: 'https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    slug: 'kitten-looking',
  },
  {
    id: 1,
    src: 'https://static.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    slug: 'kitten-looking',
  },
  {
    id: 2,
    src: 'https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg',
    slug: 'kitten-hugging',
  },
  {
    id: 3,
    src: 'https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg',
    slug: 'kitten-hugging',
  },
  {
    id: 4,
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Cute_grey_kitten.jpg',
    slug: 'kitten-staring',
  },
  {
    id: 5,
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Cute_grey_kitten.jpg',
    slug: 'kitten-staring',
  },
];

function hanldeFlipped(data) {
  //if we click on a "won" card we do nothing
  if (wonCards.value.has(data.card.slug)) {
    return;
  }

  //check if there are no flipped cards
  if (flipped.value.slug === null) {
    console.log('adding data');
    flipped.value = {
      slug: data.card.slug,
      resetCard: data.resetCard,
    };
    return;
  }

  //check if the flipped card is the same as the one flipped before
  if (flipped.value.slug !== data.card.slug) {
    score.value.wrong++;
    setTimeout(() => {
      flipped.value.resetCard();
      data.resetCard();
      flipped.value = {
        slug: null,
        resetCard: () => {},
      };
    }, 500);
    console.log('different cards');
  } else {
    score.value.right++;
    wonCards.value.add(data.card.slug);
    flipped.value = {
      slug: null,
      resetCard: () => {},
    };
    console.log('same cards');
  }

  //check if the game ended with that card
  if (wonCards.value.size >= cards.length / 2) {
    console.log('game ended');
  }
}
</script>
<style scoped></style>
