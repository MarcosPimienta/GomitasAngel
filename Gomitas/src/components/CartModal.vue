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
import { defineProps, defineEmits, computed } from 'vue';

// Define props
const props = defineProps({
    show: Boolean,
    selectedCandies: Array,
    allCandies: Array
});

const candyNames = computed(() => {
  return props.selectedCandies?.map(candyId => {
    const candy = props.allCandies?.find(c => c.id === candyId);
    return candy ? candy.name : "Unknown Candy";
  });
});

// Define emits
const emit = defineEmits(['close']);

// Computed property to check if candies are selected for all Iles
const TOTAL_ILES = 6;  // Adjust this based on your requirement
const isIncomplete = computed(() => props.selectedCandies.length < TOTAL_ILES);

// Methods
const closeModal = () => {
    emit('close');
}

</script>

<style scoped>
  /* Add your modal styles here. */
</style>