<template>
  <button class="cart-btn" type="button" @click="openModal" :disabled="!isEnabled">
    Add to Cart
  </button>
</template>

<script lang="ts">

export default {
  name: 'CartButton',
  props: {
    isEnabled: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['showModal'],
  setup(props, { emit }) {
    const openModal = () => {
      emit('showModal');
    };

    return {
      openModal,
    };
  },
};
</script>