<template>
  <div class="ile-holder">
    <button :disabled="disabled" class="left-arrow-btn" type="button" @click="IlePlus"></button>
    <button :disabled="disabled" class="right-arrow-btn" type="button" @click="IleMinus"></button>
  </div>
</template>
<script setup lang="ts">

  const props = defineProps({
    disabled: Boolean,
  });

  const emits = defineEmits<{
  (e: 'plus'): void
  (e: 'minus'): void
  }>();

  function IlePlus(event: Event) {
      const target = event.target as HTMLInputElement;
      emits('plus', target.value);
    }

  function IleMinus(event: Event) {
      const target = event.target as HTMLInputElement;
      emits('minus', target.value);
    }

</script>
<style lang="css">
@import "../assets/main.css";
</style>