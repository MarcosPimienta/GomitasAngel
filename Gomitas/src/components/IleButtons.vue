<template>
  <div class="ile-holder">
    <button class="arrow-btn" type="button" @click="IlePlus"> {{'<'}} </button>
    <button class="arrow-btn" type="button" @click="IleMinus"> {{'>'}} </button>
  </div>
</template>
<script setup lang="ts">

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