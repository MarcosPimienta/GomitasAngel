<template>
  <button class="cart-btn" type="button" @click="openModal" :disabled="!allIlesHaveCandies">
    Add to Cart
  </button>
</template>

<script lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

export default {
  name: 'CartButton',
  props: {
    candiesCount: {
      type: Number,
      required: true,
    },
  },
  emits: ['showModal'],
  setup(props, { emit }) {
    const totalIles = 5; // adjust this number based on your app's requirements

    // Computed property to check if candies have been selected for all iles
    const allIlesHaveCandies = ref(props.candiesCount >= totalIles);

    const openModal = () => {
      emit('showModal');
    };

    return {
      allIlesHaveCandies,
      openModal,
    };
  },
};
</script>