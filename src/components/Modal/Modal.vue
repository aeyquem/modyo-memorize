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
}
</style>
