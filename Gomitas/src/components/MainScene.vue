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
import * as IleSelector from "../scenes/IleSelector";
import RadioButtons from "./RadioButtons.vue";
import IleButtons from "./IleButtons.vue";

  components: {
    RadioButtons
    IleButtons
  }

    const bjsCanvas = ref(null);
    let bjsScene = ref(null);
    let ileIndex = ref(0);

    onMounted(() => {
      if (bjsCanvas.value) {
        bjsScene = createScene(bjsCanvas.value);
      }
    });

      onUpdated(()=>{

      })

      function animSwitch(item: any){
        CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[IleSelector.getIndex()], bjsScene.scene, item.name);
        console.log(IleSelector.getIndex());
    };

      function IlePlus(){
        if(IleSelector.getIndex() < 5){
          IleSelector.setIndex(IleSelector.getIndex() + 1);
          IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.ilesCone);
        }
      }

      function IleMinus(){
        if(IleSelector.getIndex() > 0){
          IleSelector.setIndex(IleSelector.getIndex() - 1);
          IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.ilesCone);
        }
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