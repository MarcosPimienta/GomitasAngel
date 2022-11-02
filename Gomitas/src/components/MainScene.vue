<template>
  <div>
    <RadioButtons />
    <canvas  class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { objectScene } from "../scenes/Scene";
import RadioButtons from "./RadioButtons.vue";

export default {
  name: "MainScene",
  components: {
    RadioButtons
  },

  setup() {
    const bjsCanvas = ref(null);
    onMounted(() => {
      if (bjsCanvas.value) {
        objectScene(bjsCanvas.value);
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
  .button{
    display: flex;
    position: absolute;
    z-index: 1;
  }
</style>