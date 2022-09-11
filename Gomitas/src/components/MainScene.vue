<template>
  <div>
    <canvas ref="bjsCanvas" />
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