<template>
  <Teleport to="#modal">
    <dialog v-if="visible" class="modal__container">
      <slot> </slot>
    </dialog>
  </Teleport>
</template>
<script setup>
defineProps({
  visible: Boolean,
});
</script>
<style>
.modal__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(8px) saturate(103%);
  -webkit-backdrop-filter: blur(8px) saturate(103%);
  background-color: rgba(209, 209, 209, 0.66);
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
