<template>
  <span class="label-text">Knot</span>
  <div class="switch">
    <input class="toggle" type="checkbox" :id="id" v-model="knotOn" @change="knotAnimation" :disabled="disabled" />
    <label :for="id">
      <span :class="{ slider: true, round: true, on: knotOn }">
        <span class="slider-text" v-if="knotOn">On</span>
        <span class="slider-text" v-else>Off</span>
      </span>
    </label>
  </div>
  <!-- Buttons to control knot color -->
  <div class="material-button-container">
    <button class="material-btn" :disabled="!knotOn" :style="{backgroundImage: `url('/svgs/Red_Button.svg')`}" @click="props.changeKnotColor('Red')"></button>
    <button class="material-btn" :disabled="!knotOn" :style="{backgroundImage: `url('/svgs/Gold_Button.svg')`}" @click="props.changeKnotColor('Gold')"></button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch} from 'vue';

export default defineComponent({
  name: 'KnotSwitch',
  props: {
    id: {
      type: String,
      required: true,
    },
    playKnotAnimation: {
      type: Function as PropType<(direction: number) => void>,
      required: true,
    },
    changeKnotColor: {
      type: Function as PropType<(color: string) => void>,
      required: true,
    },
    isKnotOn: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    }
  },
  setup(props, {emit}) {
    const knotOn = ref(props.isKnotOn);

    watch(() => props.isKnotOn, (newValue) => {
      knotOn.value = newValue;
    });

    const knotAnimation = () => {
      props.playKnotAnimation(knotOn.value ? 1 : -1);
      emit('update:isKnotOn', knotOn.value);
      console.log('Toggle Animation:', knotOn.value); // Log to console for debugging
    };

    return { knotOn, knotAnimation, props };
  },
});
</script>

<style lang="css">
@import "../assets/main.css";
</style>