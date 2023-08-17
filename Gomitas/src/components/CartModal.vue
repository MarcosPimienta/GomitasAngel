<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <h2>Shopping Cart</h2>
            <p v-if="isIncomplete">Please select candies for each Ile to fill the box!</p>
            <ul v-else>
                <li v-for="candy in selectedCandies" :key="candy.id">{{ candy.name }}</li>
            </ul>
        <button @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script setup lang="ts">

    props: ['show', 'selectedCandies'],
    computed: {
        isIncomplete() {
        // Here, check if candies are selected for all Iles.
        // Adjust this logic based on your application's data structure.
        return this.selectedCandies.length < TOTAL_ILES;
        }
    },
    methods: {
        closeModal() {
        this.$emit('close');
        }
    }

</script>

<style scoped>
  /* Add your modal styles here. */
</style>