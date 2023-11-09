<template>
  <button class="cart-btn" type="button" @click="openModal" :disabled="!isEnabled">
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
      setTimeout(() => {
        emit('showModal');
      }, 50);  // delay of 50ms
    };

    return {
      openModal,
    };
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>
