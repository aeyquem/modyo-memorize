<template>
  <main class="">
    <section>
      <PlayerInfo />
    </section>
    <section class="flex justify-center flex-wrap gap-4 p-6">
      <Card v-for="card in cards" :key="card.id" :card="card" @flipped="hanldeFlipped" />
    </section>
    <section>
      <ScoreInfo :score="score" />
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Card from './components/Card/Card.vue';
import PlayerInfo from './components/PlayerInfo/PlayerInfo.vue';
import ScoreInfo from './components/ScoreInfo/ScoreInfo.vue';

const cards = ref([]);
const wonCards = ref(new Set());
const flipped = ref({
  slug: null,
  resetCard: () => {},
});
const score = ref({
  right: 0,
  wrong: 0,
});

onMounted(async () => {
  console.log('onMounted');
  if (cards.value.length === 0) {
    try {
      const url =
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
      const res = await fetch(url);
      const data = await res.json();
      const dirtyCards = data.entries;
      //clean cards
      const cleanCards = dirtyCards.map((card) => {
        return {
          id: null,
          slug: card.meta.slug,
          src: card.fields.image.url,
        };
      });

      //duplicate cards
      const duplicatedCards = cleanCards.flatMap((card) => [card, { ...card }]);

      //insert card id
      for (let i = 0; i < duplicatedCards.length; i++) {
        duplicatedCards[i].id = i;
      }

      //randomize cards
      for (let i = duplicatedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // at random index
        [duplicatedCards[i], duplicatedCards[j]] = [duplicatedCards[j], duplicatedCards[i]];
      }

      cards.value = duplicatedCards;
      //
    } catch (e) {
      console.log(e);
    }
  }
});

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
  if (wonCards.value.size >= cards.value.length / 2) {
    console.log('game ended');
  }
}
</script>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-between;
}
</style>
