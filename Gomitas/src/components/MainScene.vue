<template>
  <div>
    <RadioButtons @animationPlay="animSwitch"/>
    <canvas  class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUpdated } from "vue";
import { createScene, exposeAnim } from "../scenes/Scene";
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

      function animSwitch(item: any){
      if(item.name == "ChocoMellow"){
        console.log(item.name);
        exposeAnim(0, bjsScene.candiesInstances[0], bjsScene.scene);
      }
      else if(item.name == "LifeSavers"){
        console.log(item.name);
        exposeAnim(1, bjsScene.candiesInstances[0], bjsScene.scene);
      }
      else if(item.name == "Oranges"){
        console.log(item.name);
        exposeAnim(2, bjsScene.candiesInstances[0], bjsScene.scene);
      }
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