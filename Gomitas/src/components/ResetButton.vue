<template>
  <button class="cart-btn" @click="resetCandies">Reset Candies</button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['reset']);

const resetCandies = () => {
  emit('reset');
};

</script>