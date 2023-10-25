<template>
  <div class="switch">
    <input class="toggle" type="checkbox" v-model="isOn" @change="toggleAnimation" />
    <label>
      <span :class="{ slider: true, round: true, on: isOn }">
        <span class="slider-text" v-if="isOn">Knot on</span>
        <span class="slider-text" v-else>Knot off</span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'KnotSwitch',
  props: {
    playKnotAnimation: {
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
    props.playKnotAnimation(isOn.value ? -1 : 1);
    emit('update:isBoxOpen', isOn.value);
    console.log('Toggle Animation:', isOn.value); // Log to console for debugging
    renderKey.value++;
  };

    return { isOn, toggleAnimation, renderKey };
  },
});
</script>

<style lang="css">
@import "../assets/main.css";
</style>