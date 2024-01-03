<template>
  <form class="info-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" placeholder="Name">
    </div>

    <div class="form-group">
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" placeholder="Last Name">
    </div>

    <div class="form-group">
      <label for="address">Address:</label>
      <input type="text" id="address" placeholder="Address">
    </div>

    <div class="form-group">
      <label for="city">City:</label>
      <input type="text" id="city" placeholder="City">
    </div>

    <div class="form-group">
      <label for="state">State:</label>
      <input type="text" id="state" placeholder="State">
    </div>

    <div class="form-group">
      <label for="zipCode">Zip Code:</label>
      <input type="text" id="zipCode" placeholder="Zip Code">
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Email">
    </div>

    <div class="form-group">
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" placeholder="Phone">
    </div>

    <!-- Add submit or action buttons here if needed -->
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const lastName = ref('');
const address = ref('');
const city = ref('');
const state = ref('');
const zipCode = ref('');
const email = ref('');
const phone = ref('');

const emit = defineEmits(['back']);

const submitForm = () => {
  // Logic to handle form submission
  console.log('Form data:', { name, lastName, address, city, state, zipCode, email, phone });
};

const back = () => {
  emit('back');
};
</script>


<style lang="css">
@import "../assets/main.css";
</style>