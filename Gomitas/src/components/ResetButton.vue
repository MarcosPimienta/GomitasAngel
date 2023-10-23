<template>
  <button :disabled="disabled" class="cart-btn" @click="resetCandies">Reset Candies</button>
</template>

<script setup lang="ts">

const emit = defineEmits(['reset']);

const props = defineProps({
    disabled: Boolean,
  });

const resetCandies = () => {
  emit('reset');
};

</script>