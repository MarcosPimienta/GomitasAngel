<template>
  <div v-show="show && !isIncomplete" class="modal">
    <div class="modal-content">
      <div class="responsive-container">
        <!-- Button Section -->
        <div class="button-container">
          <button class="close-btn" @click="closeModal"/>
          <button class="send-btn" @click="toggleInfoForm" v-show="!showInfoForm && !showPaymentForm"/>
          <button class="back-btn" @click="handleBack" v-show="showInfoForm || showPaymentForm"/>
          <button class="pay-btn" @click="showPayment" v-show="showInfoForm && !showPaymentForm"/>
        </div>
        <div class="overlay-content">
          <!-- Cart Details Section -->
          <CartDetails v-if="!showInfoForm && !showPaymentForm"
            :candyItems="candyItems"
            :knotInfo="knotInfo"
            :nameText="nameText"
            :messageText="messageText"/>

          <!-- Info Form Section -->
          <InfoForm v-if="showInfoForm && !showPaymentForm" @back="toggleInfoForm" />

          <!-- Payment Form Section -->
          <PaymentForm v-if="showPaymentForm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

import CartDetails from './CartDetails.vue';
import InfoForm from './InfoForm.vue';
import PaymentForm from './PaymentForm.vue';

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
const showPaymentForm = ref(false);

interface CandyItem {
  name: string;
  imageUrl: string;
}

const ribbonSvgPaths = {
  Red: "/GomitasAngel/svgs/Red_Knot.svg",
  Gold: "/GomitasAngel/svgs/Gold_Knot.svg",
};

const knotInfo = computed(() => {
  if (props.knotPresent) {
    // Type guard to ensure selectedKnotColor is a valid key
    const knotColor = props.selectedKnotColor && props.selectedKnotColor in ribbonSvgPaths
                      ? props.selectedKnotColor
                      : "Default";
    let knotText = knotColor;
    let imageUrl = ribbonSvgPaths[knotColor as keyof typeof ribbonSvgPaths] || '/GomitasAngel/svgs/default_knot.svg'; // Fallback image for "Default"
    return { text: knotText, imageUrl };
  } else {
    return { text: 'No Knot', imageUrl: '/GomitasAngel/svgs/default_knot.svg' };
  }
});

// Using props.selectedCandies here to access the prop
const candyItems = computed<CandyItem[]>(() => {
  return props.selectedCandies.map(candyId => {
    const candy = props.allCandies?.find(c => c.id === candyId);
    return {
      name: candy ? candy.name : "Unknown Candy",
      imageUrl: candy ? candy.imageUrl : "/GomitasAngel/svgs/unknown.png"
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

const toggleInfoForm = () => {
  showInfoForm.value = !showInfoForm.value;
};

// Define emits
const emit = defineEmits(['close', 'send', 'back', 'pay']);

// Methods
const resetStates = () => {
  showInfoForm.value = false;
  showPaymentForm.value = false;
};

const handleBack = () => {
  if (showPaymentForm.value) {
    showPaymentForm.value = false;
    showInfoForm.value = true;
  } else if (showInfoForm.value) {
    resetStates();
  }
};

const closeModal = () => {
  resetStates();
  // Emit 'close' event for parent component to handle
  emit('close');
};

const showPayment = () => {
  showInfoForm.value = false;
  showPaymentForm.value = true;
};

const sendModal = () => {
  showInfoForm.value = true;
  emit('send');
};

</script>

<style lang="css">
@import "../assets/main.css";
</style>