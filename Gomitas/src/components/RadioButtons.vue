<template>
  <div>
    <div v-for="item in animState" :key="item.id">
      <input
        class="radio-btn"
        :disabled="disabled"
        :value="item.id"
        :checked="item.id === selectedCandyId"
        @input="updateSelectedCandy(item.id)"
        type="radio"
        :name="'ds_' + item.id"
        @click="handleClick(item)"
      />
      <label class="label-text" :for="'ds_' + item.id">{{ item.name }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const emit = defineEmits<{
  (e: 'update:selectedCandyId', value: number): void;
  (e: 'animationPlay', object: AnimState): void;
  (e: 'candySelected', candyId: number): void;
}>();

interface AnimState {
  id: number;
  name: string;
  state: boolean;
};

const animState: AnimState[] = [
  { id: 0, name:"ChocoMellows", state: false },
  { id: 1, name:"Cables", state: false },
  { id: 2, name:"LifeSavers", state: false },
  { id: 3, name:"Ribbons", state: false },
  { id: 4, name:"Strawberries", state: false },
  { id: 5, name:"Worms", state: false },
];

// Define the new prop for the currently selected candy ID
const props = defineProps({
  disabled: Boolean,
  selectedCandyId: {
    type: [Number, Object] as PropType<number | null>,
    default: null
  }
});

function updateSelectedCandy(value: number) {
    emit('update:selectedCandyId', value);
  }

function handleClick(item: AnimState) {
  emit('animationPlay', item);
  emit('candySelected', item.id);
}

</script>
<style lang="css">
@import "../assets/main.css";
</style>