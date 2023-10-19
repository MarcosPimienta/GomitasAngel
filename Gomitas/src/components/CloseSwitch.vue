<template>
  <button @click="toggleAnimation">
    {{ isOn ? 'On' : 'Off' }}
  </button>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'CloseSwitch',
  emits: ['update'],  // Define the custom event here
  setup(_, { emit }) {
    const isOn = ref(false); // state to track whether the switch is on or off

    // Function to toggle the animation state
    const toggleAnimation = () => {
      isOn.value = !isOn.value;
      const direction = isOn.value ? -1 : 1; // Determine the direction based on the switch state
      emit('update', direction);  // Emit the direction to the parent component
    };

    return { isOn, toggleAnimation };
  }
});
</script>

<style scoped>
button {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}

/* You can add more styles or customize the button as needed */
</style>