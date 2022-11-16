<template>
  <div class="btn-holder">
    <button class="arrow-btn" type="button" @click="IlePlus"> {{'->'}} </button>
    <button class="arrow-btn" type="button" @click="IleMinus"> {{'<-'}} </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";

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