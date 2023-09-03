<template>
  <div class="auth_login">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

  <script lang="ts">
  import { ref } from 'vue';

  export default {
    name: 'LoginComponent',
    setup() {
      const username = ref('');
      const password = ref('');

      const handleLogin = () => {
        // Call API or dispatch action to handle the login
        console.log(`Logging in with username: ${username.value} and password: ${password.value}`);
        this.$emit('loginSuccessful');
        // You'll replace the above with an actual API call or state management action.
      }

      return {
        username,
        password,
        handleLogin
      };
    }
  }
  </script>

  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
  }

  .input-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }
  </style>