<template>
  <div v-show="show && !isIncomplete" class="modal">
    <div class="modal-content">
      <div class="overlay-content">
        <button class="close-btn" @click="closeModal"></button>
        <p class="cart-title">Shopping Cart</p>
        <ul>
          <li v-for="item in candyItems" :key="item.name" class="item-container">
            <div :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }" class="candy-image"></div>
            {{ item.name }}
          </li>
          <div class="knot-info">
            <p>{{ knotInfo }}</p>
          </div>
        </ul>
      </div>
      <!-- <img src="/svgs/Modal_Content.svg" alt="Modal Content"> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

interface SimpleCandy {
  id: number | string;
  name: string;
  imageUrl: string;
}

// Define props
const props = defineProps({
  show: Boolean,
  selectedKnotColor: String,
  knotPresent: Boolean,
  selectedCandies: {
    type: Array,
    default: () => [] // Provide a default value to ensure it's always an array
  },
  allCandies: Array
});

interface CandyItem {
  name: string;
  imageUrl: string;
}

const knotInfo = computed(() => {
  return props.knotPresent ? `Knot Color: ${props.selectedKnotColor}` : 'No Knot';
});

// Using props.selectedCandies here to access the prop
const candyItems = computed<CandyItem[]>(() => {
  return props.selectedCandies.map(candyId => {
    const candy = props.allCandies?.find(c => c.id === candyId);
    return {
      name: candy ? candy.name : "Unknown Candy",
      imageUrl: candy ? candy.imageUrl : "/svgs/unknown.png"
    };
  });
});

// Using props.selectedCandies here to check for completeness
const isIncomplete = computed(() => {
  return props.selectedCandies.includes(null);
});

const hasCandies = ref(props.selectedCandies.some(candy => candy !== null));

watch(() => props.selectedCandies, (newVal) => {
  // When newVal is an array of all nulls, reset hasCandies to false
  hasCandies.value = newVal.some(candy => candy !== null);
  if (!hasCandies.value) {
    // Perform additional reset logic if needed
  }
});

// Define emits
const emit = defineEmits(['close']);

// Methods
const closeModal = () => {
  emit('close');
}
</script>

<style lang="css">
@import "../assets/main.css";
</style>