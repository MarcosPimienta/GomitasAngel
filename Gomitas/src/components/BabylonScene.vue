<template>
  <div>
    <canvas ref="bjsCanvas" />
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/runtime-core";
import { createScene } from "../scenes/MyFirstScene";

export default {
  name: "BabylonScene",
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