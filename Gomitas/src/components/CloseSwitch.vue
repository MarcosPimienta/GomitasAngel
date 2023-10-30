<template>
  <div class="switch">
    <input class="toggle" type="checkbox" :id="id" v-model="isOn" @change="toggleAnimation" />
    <label :for="id">
      <span :class="{ slider: true, round: true, on: isOn }">
        <span class="slider-text" v-if="isOn">Open</span>
        <span class="slider-text" v-else>Close</span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch} from 'vue';

export default defineComponent({
  name: 'CloseSwitch',
  props: {
    id: {
      type: String,
      required: true,
    },
    playCloseAnimation: {
      type: Function as PropType<(direction: number) => void>,
      required: true,
    },
    isBoxOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, {emit}) {
    const renderKey = ref(0);
    const isOn = ref(props.isBoxOpen);

    // Function to toggle the animation state
    const toggleAnimation = () => {
    props.playCloseAnimation(isOn.value ? 1 : -1);
    emit('update:isBoxOpen', isOn.value);
    console.log('Toggle Animation:', isOn.value); // Log to console for debugging
    renderKey.value++;
  };
  // ... inside the setup function
  watch(() => props.isBoxOpen, (newVal) => {
    isOn.value = newVal;
  });

    return { isOn, toggleAnimation, renderKey };
  },
});
</script>

<style lang="css">
@import "../assets/main.css";
</style>