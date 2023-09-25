<template>
  <span>Welcome {{ player.playerName }}!</span>
</template>
<script setup>
import { usePlayerStore } from '@/stores/player.store';

const player = usePlayerStore();
</script>
