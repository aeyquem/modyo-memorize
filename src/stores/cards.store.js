import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCardStore = defineStore('card', () => {
  const remainingHiddenCards = ref(20);
  const cards = ref([]);
  async function fetchCardsImages() {
    try {
      const apiUrl =
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
      const response = await fetch(apiUrl);
      const data = await response.json();
      cards = data;
    } catch (error) {
      console.error(error);
      cards = [];
    }
  }

  return { remainingHiddenCards, fetchCardsImages };
});
