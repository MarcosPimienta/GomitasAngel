<template>
  <div>
    <MainScene />
  </div>
</template>

<script lang="ts">
import MainScene from "./components/MainScene.vue";

export default {
  name: "App",
  components: {
    MainScene,
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}
</style>
