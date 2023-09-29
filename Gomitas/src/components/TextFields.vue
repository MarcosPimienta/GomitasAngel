<template>
  <input v-model="dynamicText" @input="updateTexture" />
</template>
<script>
  export default {
    data() {
      return {
            dynamicText: "",
            dynamicTexture: null, // Assume this is somehow set initially
          };
      },

      methods: {
        updateTexture() {
          if (this.dynamicTexture) {
            const ctx = this.dynamicTexture.getContext();
            ctx.clearRect(0, 0, 512, 512); // Clear previous text
            ctx.fillText(this.dynamicText, 256, 256); // Draw new text
            this.dynamicTexture.update(); // Update the texture
          }
        },
    },
  };
      </script>