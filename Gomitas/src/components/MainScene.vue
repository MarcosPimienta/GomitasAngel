<template>
  <div>
    <div class="btn-holder">
      <CartButton :isEnabled="allCandiesSelected" @showModal="yourModalFunction"/>
      <RadioButtons @animationPlay="animSwitch" @candySelected="selectCandyForIle(IleSelector.getIndex(), $event)" />
      <IleButtons @plus="IlePlus" @minus="IleMinus"/>
    </div>
    <canvas class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from "vue";
import { createScene } from "../scenes/Scene";
import * as CandyLoader from "../scenes/CandyLoader";
import * as IleSelector from "../scenes/IleSelector";
import CartButton from "./CartButton.vue";
import RadioButtons from "./RadioButtons.vue";
import IleButtons from "./IleButtons.vue";

// Tracking selected candies for each 'ile'
const selectedCandies = ref([null, null, null, null, null, null]);

// Computed property to check if all 'iles' have candies selected
const allCandiesSelected = computed(() => {
  return selectedCandies.value.every(candy => candy !== null);
});

const bjsCanvas = ref(null);
let bjsScene = ref(null);

onMounted(() => {
  if (bjsCanvas.value) {
    bjsScene = createScene(bjsCanvas.value);
  }
});

function selectCandyForIle(ileIndex, candyId) {
  selectedCandies.value[ileIndex] = candyId;
}

function enableCart() {
  if (allCandiesSelected.value) {
    // Logic to enable cart or show modal goes here
  }
}

function animSwitch(item: any) {
  CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[IleSelector.getIndex()], bjsScene.scene, item.name);
  console.log(IleSelector.getIndex());
};

function IlePlus() {
  if (IleSelector.getIndex() < 5) {
    IleSelector.setIndex(IleSelector.getIndex() + 1);
    IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.ilesCone);
  }
}

function IleMinus() {
  if (IleSelector.getIndex() > 0) {
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
  /* .button{
    display: flex;
    position: absolute;
  } */
</style>