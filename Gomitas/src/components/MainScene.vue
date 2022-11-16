<template>
  <div>
    <RadioButtons @animationPlay="animSwitch"/>
    <IleButtons @plus="IlePlus" @minus="IleMinus"/>
    <canvas  class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUpdated } from "vue";
import { createScene } from "../scenes/Scene";
import * as CandyLoader from "../scenes/CandyLoader";
import RadioButtons from "./RadioButtons.vue";
import IleButtons from "./IleButtons.vue";

  components: {
    RadioButtons,
    IleButtons
  }

    const bjsCanvas = ref(null);
    let bjsScene = ref(null);
    let ileSelector = ref(0);

    onMounted(() => {
      if (bjsCanvas.value) {
        bjsScene = createScene(bjsCanvas.value);
      }
    });

      function animSwitch(item: any){
      if(item.name == "ChocoMellow"){
        console.log(item.name);
        CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[ileSelector.value], bjsScene.scene);
      }
      else if(item.name == "LifeSavers"){
        console.log(item.name);
        CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[ileSelector.value], bjsScene.scene);
      }
      else if(item.name == "Oranges"){
        console.log(item.name);
        CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[ileSelector.value], bjsScene.scene);
      }
    };

      function IlePlus(){
        ileSelector.value++;
        console.log(ileSelector.value);
      }

      function IleMinus(){
        ileSelector.value--;
        console.log(ileSelector.value);
      }

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