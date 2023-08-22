<template>
  <div>
    <div class="btn-holder">
      <CartButton :isEnabled="allCandiesSelected" @showModal="displayModal"/>
      <RadioButtons
      :key="currentIleIndex ?? 0"
      :selectedCandyId="selectedCandies[IleSelector.getIndex()]"
      @animationPlay="animSwitch"
      @candySelected="selectCandyForIle(IleSelector.getIndex(), $event)" />
      <IleButtons @plus="IlePlus" @minus="IleMinus"/>
      <ResetButton @reset="resetAllCandies"/>
    </div>
    <CartModal class="modal" :key="modalKey" :show="showModal" :selectedCandies="selectedCandies" :allCandies="allCandies" @close="showModal = false"/>
    <canvas class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import type { Scene, Engine, Mesh } from "@babylonjs/core";
import { ref, computed, onMounted, onUpdated } from "vue";
import { createScene } from "../scenes/Scene";
import * as CandyLoader from "../scenes/CandyLoader";
import * as IleSelector from "../scenes/IleSelector";
import CartButton from "./CartButton.vue";
import CartModal from "./CartModal.vue";
import ResetButton from "./ResetButton.vue";
import RadioButtons from "./RadioButtons.vue";
import IleButtons from "./IleButtons.vue";

// Tracking selected candies for each 'ile'
const selectedCandies = ref([null, null, null, null, null, null]);
const showModal = ref(false);
const allCandies = [
  { id: 0, name:"ChocoMellows" },
  { id: 1, name:"LifeSavers" },
  { id: 2, name:"Oranges" },
  { id: 3, name:"Ribbons" },
  { id: 4, name:"Strawberries" },
  { id: 5, name:"Worms" },
  // ... add other candies
];

interface SceneReturnType {
  scene: Scene;
  engine: Engine;
  candiesInstances: CandyLoader.Candy[];
  ilesCone: Mesh;
}

// Computed property to check if all 'iles' have candies selected
const allCandiesSelected = computed(() => {
  return selectedCandies.value.every(candy => candy !== null);
});

const bjsCanvas = ref(null);
const modalKey = ref(0);
const currentIleIndex = ref<number | null>(null);
let bjsScene: Ref<SceneReturnType | null> = ref(null)

onMounted(() => {
  if (bjsCanvas.value) {
    bjsScene = createScene(bjsCanvas.value, (selectedIndex) => {
      currentIleIndex.value = selectedIndex;
      // Further logic to handle the ile selection can go here
    });
    IleSelector.setAllCandiesReference(allCandies); // This is set once after the scene is created
  }
});

function selectCandyForIle(ileIndex, candyId) {
  selectedCandies.value[ileIndex] = candyId;
  IleSelector.setCandyForIle(ileIndex, candyId);
}

function displayModal() {
    showModal.value = true;  // This will show the modal when CartButton is clicked
}

function enableCart() {
  if (allCandiesSelected.value) {
    // Logic to enable cart or show modal goes here
  }
}

function resetAllCandies() {
  selectedCandies.value = [null, null, null, null, null, null];
  CandyLoader.resetAllAnimations(bjsScene.candiesInstances);
  showModal.value = false
  modalKey.value++;
}

function animSwitch(item: any) {
  CandyLoader.candiesPlay(item.id, bjsScene.candiesInstances[IleSelector.getIndex()], bjsScene.scene, item.name);
  console.log(IleSelector.getIndex());
};

function IlePlus() {
  if (IleSelector.getIndex() < 5) {
    IleSelector.setIndex(IleSelector.getIndex() + 1);
    IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.ilesCone);
    currentIleIndex.value = IleSelector.getIndex();
  }
}

function IleMinus() {
  if (IleSelector.getIndex() > 0) {
    IleSelector.setIndex(IleSelector.getIndex() - 1);
    IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.ilesCone);
    currentIleIndex.value = IleSelector.getIndex();
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