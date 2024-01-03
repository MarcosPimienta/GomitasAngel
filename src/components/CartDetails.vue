<template>
  <div class="cart-details">
    <p class="cart-title">Shopping Cart</p>
    <ul>
      <li v-for="item in candyItems" :key="item.name" class="item-container">
        <div :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }" class="candy-image"></div>
        <div class="item-info">{{ item.name }}</div>
      </li>
      <div class="knot-info">
        <div :style="{ backgroundImage: 'url(' + knotInfo.imageUrl + ')' }" class="candy-image"></div>
        <p class="item-info">{{ knotInfo.text }}</p>
      </div>
    </ul>
    <div v-if="nameText" class="name-overlay">
      <p class="name-message-text">{{ nameText }}</p>
    </div>
    <div v-if="messageText" class="message-overlay">
      <p class="name-message-text">{{ messageText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  candyItems: Array,
  knotInfo: Object,
  nameText: String,
  messageText: String
});
</script>

<style lang="css">
@import "../assets/main.css";
</style>