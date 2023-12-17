<template>
  <div v-show="show && !isIncomplete" class="modal">
    <div class="modal-content">
      <div class="overlay-content" v-show="!showInfoForm">
        <button class="close-btn" @click="closeModal"/>
        <button class="send-btn" @click="sendModal"/>
          <p class="cart-title">Shopping Cart</p>
          <ul>
            <li v-for="item in candyItems" :key="item.name" class="item-container">
              <div :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }" class="candy-image"></div>
                <div class="item-info">
                  {{ item.name }}
                </div>
            </li>
            <div class="knot-info">
              <div :style="{ backgroundImage: 'url(' + knotInfo.imageUrl + ')' }" class="candy-image"></div>
              <p class="item-info">{{ knotInfo.text }}</p>
            </div>
          </ul>
        </div>
        <div v-if="nameText" class="name-overlay">
          <p class="name-message-text">{{ props.nameText }}</p>
        </div>
        <div v-if="messageText" class="message-overlay">
          <p class="name-message-text">{{ props.messageText }}</p>
        </div>
    </div>
    <InfoForm v-show="showInfoForm" @back="backToCart" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

import InfoForm from './InfoForm.vue';

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
  knotUrl: String,
  nameText: String,
  messageText: String,
  selectedCandies: {
    type: Array,
    default: () => [] // Provide a default value to ensure it's always an array
  },
  allCandies: Array
});

const showInfoForm = ref(false);

interface CandyItem {
  name: string;
  imageUrl: string;
}

const ribbonSvgPaths = {
  Red: "/svgs/Red_Knot.svg",
  Gold: "/svgs/Gold_Knot.svg",
};

const knotInfo = computed(() => {
  if (props.knotPresent) {
    // Type guard to ensure selectedKnotColor is a valid key
    const knotColor = props.selectedKnotColor && props.selectedKnotColor in ribbonSvgPaths
                      ? props.selectedKnotColor
                      : "Default";
    let knotText = knotColor;
    let imageUrl = ribbonSvgPaths[knotColor as keyof typeof ribbonSvgPaths] || '/svgs/default_knot.svg'; // Fallback image for "Default"
    return { text: knotText, imageUrl };
  } else {
    return { text: 'No Knot', imageUrl: '/svgs/default_knot.svg' };
  }
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

const backToCart = () => {
  // Switch back to cart view
  showInfoForm.value = false;
};

const sendModal = () => {
  showInfoForm.value = true;
  emit('send');
};

// Define emits
const emit = defineEmits(['close', 'send']);

// Methods
const closeModal = () => {
  emit('close');
}

</script>

<style lang="css">
@import "../assets/main.css";
</style>