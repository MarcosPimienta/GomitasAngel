<template>
  <div v-show="show && !isIncomplete" class="modal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal"></button>
      <p class="cart-title">Shopping Cart</p>
      <ul>
        <li v-for="name in candyNames">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

interface SimpleCandy {
  id: number | string;
  name: string;
}

// Define props
const props = defineProps({
  show: Boolean,
  selectedCandies: {
    type: Array,
    default: () => [] // Provide a default value to ensure it's always an array
  },
  allCandies: Array
});

// Using props.selectedCandies here to access the prop
const candyNames = computed(() => {
  return props.selectedCandies.map(candyId => {
    const candy = props.allCandies?.find(c => c.id === candyId);
    return candy ? candy.name : "Unknown Candy";
  });
});

// Using props.selectedCandies here to check for completeness
const isIncomplete = computed(() => {
  return props.selectedCandies.includes(null);
});

const hasCandies = ref(props.selectedCandies.some(candy => candy !== null));

watch(() => props.selectedCandies, (newVal) => {
  // When newVal is an array of all nulls, reset hasCandies to false
  hasCandies.value = newVal.some(candy => candy !== null);
  if (!hasCandies.value) {
    // Perform additional reset logic if needed
  }
});

// Define emits
const emit = defineEmits(['close']);

// Methods
const closeModal = () => {
  emit('close');
}
</script>

<style lang="css">
@import "../assets/main.css";
</style>