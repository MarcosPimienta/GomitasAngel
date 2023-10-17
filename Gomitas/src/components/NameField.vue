<template>
  <label class="label-text">Name</label>
  <input class="name-field" v-model="dynamicText" @input="updateTexture" />
</template>

<script>
export default {
  props: {
    dynamicTexture: Object,
  },
  data() {
    return {
      dynamicText: "",
    };
  },
  methods: {
    updateTexture() {
      this.$emit('text-updated', this.dynamicText);
    },
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>
