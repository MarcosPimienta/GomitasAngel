<template>
  <div v-show="show && !isIncomplete" class="modal">
    <div class="modal-content">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="name in candyNames">{{ name }}</li>
      </ul>
    <button @click="closeModal">Close</button>
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

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 80%; /* You can adjust this as needed */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

button {
    margin-top: 20px;
}
</style>