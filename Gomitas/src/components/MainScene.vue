<template>
  <div>
    <div class="btn-holder">
      <RadioButtons @animationPlay="animSwitch"/>
      <IleButtons @plus="IlePlus" @minus="IleMinus"/>
    </div>
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
        CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[ileSelector.value], bjsScene.scene, item.name);
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

  body,
  html {
    overflow: hidden;
  }

  .bjsCanvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
  }
  .button{
    display: flex;
    position: absolute;
  }
</style>