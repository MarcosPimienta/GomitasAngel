<template>
  <div class="ile-holder">
    <button class="left-arrow-btn" type="button" :disabled="disabled" @click="IlePlus"></button>
    <button class="right-arrow-btn" type="button" :disabled="disabled" @click="IleMinus"></button>
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