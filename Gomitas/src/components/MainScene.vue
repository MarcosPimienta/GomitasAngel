<template>
  <div>
    <RadioButtons @animationPlay="animationExec"/>
    <canvas  class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUpdated } from "vue";
import { createScene } from "../scenes/Scene";
import RadioButtons from "./RadioButtons.vue";

  components: {
    RadioButtons
  }

    const bjsCanvas = ref(null);
    let bjsScene = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        bjsScene = createScene(bjsCanvas.value);
      }
    });

      function animationExec(object){
        console.log(object);
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