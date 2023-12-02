<template>
  <button :disabled="disabled" class="reset-btn" @click="resetCandies"></button>
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