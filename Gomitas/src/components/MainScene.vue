<template>
  <div>
    <canvas  class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { createScene } from "../scenes/Scene";

export default {
  name: "MainScene",
  setup() {
    const bjsCanvas = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value);
      }
    });
    return {
      bjsCanvas,
    };
  },
};
</script>
<style>
  .bjsCanvas {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>