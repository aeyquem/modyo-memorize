<template>
  <main class="">
    <section>
      <PlayerInfo />
    </section>
    <section class="flex justify-center flex-wrap gap-4 p-6">
      <Card
        v-for="card in cards"
        :key="card.id"
        :isFlipped="card.isFlipped"
        :card="card"
        @click.prevent="handleCardClicked(card)"
      />
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
  id: null,
  isFlipped: null,
});
const score = ref({
  right: 0,
  wrong: 0,
});
const canClick = ref(true);

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

      //insert card id and state
      for (let i = 0; i < duplicatedCards.length; i++) {
        duplicatedCards[i].id = i;
        duplicatedCards[i].isFlipped = false;
      }

      //randomize cards
      for (let i = duplicatedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // at random index
        [duplicatedCards[i], duplicatedCards[j]] = [duplicatedCards[j], duplicatedCards[i]];
      }

      cards.value = duplicatedCards;
    } catch (e) {
      console.log(e);
    }
  }
});

function handleCardClicked(card) {
  //verify we can click a card
  if (wonCards.value.has(card.slug)) {
    return;
  }

  if (!canClick.value) {
    return;
  }
  //prevent user from clicking again while we are checking the cards
  canClick.value = false;

  //flip the card
  card.isFlipped = true;
  //can, check if we have a flipped card
  if (flipped.value.slug === null) {
    console.log('adding data');
    flipped.value = card;
    console.log(flipped.value);
    canClick.value = true;
    return;
  }

  //check if we are not clickikg the same card twice
  if (flipped.value.id === card.id) {
    canClick.value = true;
    return;
  }

  //if we have a flipped card, check if the card is the same as the one flipped before
  if (flipped.value.slug === card.slug) {
    console.log('same card');
    wonCards.value.add(card.slug);
    flipped.value = {
      slug: null,
      id: null,
      isFlipped: false,
    };
    score.value.right++;
    canClick.value = true;
  }
  //if not, reset the flipped card and the card we clicked
  else {
    console.log('wrong card');
    score.value.wrong++;
    setTimeout(() => {
      card.isFlipped = false;
      flipped.value.isFlipped = false;
      flipped.value = {
        slug: null,
        id: null,
        isFlipped: null,
      };
      canClick.value = true;
    }, 500);
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
