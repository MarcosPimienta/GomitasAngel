<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <h2>Shopping Cart</h2>
            <p v-if="isIncomplete">Please select candies for each Ile to fill the box!</p>
            <ul v-else>
              <li v-for="name in candyNames" :key="name">{{ name }}</li>
            </ul>
        <button @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Candy } from "../scenes/CandyLoader"

// Define props
const { show, selectedCandies, allCandies } = defineProps({
    show: Boolean,
    selectedCandies: Array as () => number[], // if it's just an array of ids
    allCandies: Array as () => Candy[]
});

const candyNames = computed(() => {
  return selectedCandies?.map(candyId => {
    const candy = allCandies?.find(c => c.id === candyId);
    return candy ? candy.name : "Unknown Candy";
  });
});

// Define emits
const emit = defineEmits(['close']);

// Computed property to check if candies are selected for all Iles
const TOTAL_ILES = 6;  // Adjust this based on your requirement
const isIncomplete = computed(() => (selectedCandies?.length ?? 0) < TOTAL_ILES);

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