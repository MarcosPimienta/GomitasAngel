<template>
  <form class="payment-form" @submit.prevent="submitForm">
    <div class="cart-title">Payment Information</div>

    <div class="form-group">
      <label for="cardName">Cardholder's Name:</label>
      <input type="text" id="cardName" v-model="cardName" placeholder="Name on Card">
    </div>

    <div class="form-group">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" v-model="cardNumber" placeholder="1234 5678 9123 4567" maxlength="19">
    </div>

    <div class="form-row">
      <div class="form-group half-width">
        <label for="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" maxlength="5">
      </div>

      <div class="form-group half-width">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" placeholder="123" maxlength="4">
      </div>
    </div>

    <input type="button" class="submit-btn" value="Pay"/>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cardName = ref('');
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');

const submitForm = () => {
  // Implement form submission logic here
  console.log('Form data:', { cardName, cardNumber, expiryDate, cvv });
};

const backToCart = () => {
  // Emit an event or route back to the cart
};
</script>

<style lang="css">
@import "../assets/main.css";
</style>