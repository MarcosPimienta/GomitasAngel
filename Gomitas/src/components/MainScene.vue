<template>
  <!-- <AuthLogin v-if="!isAuthenticated" @loginSuccessful="handleLogin" /> -->
  <div>
    <div class="btn-holder">
      <CartButton :isEnabled="allCandiesSelected" @showModal="displayModal"/>
      <RadioButtons
      :disabled="!isBoxOpen"
      :key="currentIleIndex ?? 0"
      :selectedCandyId="selectedCandies[IleSelector.getIndex()]"
      @animationPlay="animSwitch"
      @candySelected="selectCandyForIle(IleSelector.getIndex(), $event)" />
      <NameField @text-updated="handleUpdatedText" />
      <MessageField @text-updated="handleUpdatedMsg" />
      <CloseSwitch id="closeSwitch" :playCloseAnimation="playCloseAnimation" :isBoxOpen="isBoxOpen" @update:isBoxOpen="isBoxOpen = $event"/>
      <KnotSwitch :disabled="isBoxOpen" id="knotSwitch" :playKnotAnimation="playKnotAnimation" :isKnotOn="isKnotOn" @update:isKnotOn="isKnotOn = $event"/>
      <IleButtons :disabled="!isBoxOpen" @plus="IlePlus" @minus="IleMinus"/>
      <ResetButton :disabled="!isBoxOpen" @reset="resetAllCandies"/>
    </div>
    <CartModal class="modal" :show="showModal" :selectedCandies="selectedCandies" :allCandies="allCandies" @close="showModal = false"/>
    <canvas class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import type { Scene, Engine, Mesh } from "@babylonjs/core";
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { createScene } from "../scenes/Scene";
import * as CandyLoader from "../scenes/CandyLoader";
import * as IleSelector from "../scenes/IleSelector";
/* import AuthLogin from './AuthLogin.vue'; */
import CartButton from "./CartButton.vue";
import CartModal from "./CartModal.vue";
import ResetButton from "./ResetButton.vue";
import RadioButtons from "./RadioButtons.vue";
import IleButtons from "./IleButtons.vue";
import NameField from "./NameField.vue";
import MessageField from "./MessageField.vue";
import CloseSwitch from "./CloseSwitch.vue";
import KnotSwitch from "./KnotSwitch.vue";

// Tracking selected candies for each 'ile'
const selectedCandies = ref([null, null, null, null, null, null]);
const showModal = ref(false);
const isAuthenticated = ref(false); // This should be set based on your authentication status
const isBoxOpen = ref(true);
const isKnotOn = ref(false);

const allCandies = [
  { id: 0, name:"ChocoMellows"},
  { id: 1, name:"Cables"},
  { id: 2, name:"LifeSavers"},
  { id: 3, name:"Ribbons"},
  { id: 4, name:"Strawberries"},
  { id: 5, name:"Worms"},
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

  onMounted(async () => {
  console.log('bjsCanvas.value before createScene:', bjsCanvas.value);
  if (bjsCanvas.value) {
    const sceneObject = createScene(bjsCanvas.value, (selectedIndex) => {
      currentIleIndex.value = selectedIndex;
    });
    console.log('sceneObject after createScene:', sceneObject);
    bjsScene.value = sceneObject;
  }
  console.log('bjsScene.value after assignment:', bjsScene.value);
});

const handleUpdatedText = (updatedText: string) => {
  console.log('Updating texture with text:', updatedText);
  if (bjsScene.value && bjsScene.value.updateText) {
    console.log("Calling updateText Function");
    bjsScene.value.updateText(updatedText); // Call the updateText function with the new text
  } else {
    console.log("updateText Function is Undefined");
  }
};

const handleUpdatedMsg = (updatedText: string) => {
  console.log('Updating texture with message:', updatedText);
  if (bjsScene.value && bjsScene.value.updateText) {
    console.log("Calling updateText Function");
    bjsScene.value.updateMsg(updatedText); // Call the updateText function with the new text
  } else {
    console.log("updateText Function is Undefined");
  }
};

const playCloseAnimation = (direction: number) => {
  if (bjsScene.value && bjsScene.value.scene) {
    if (isKnotOn.value && direction === 1) { // If trying to close the box with knot on
      playKnotAnimation(-1); // Reverse the knot animation
      isKnotOn.value = false; // Set the knot switch to off
      // Wait for the knot animation to finish before proceeding with the box close animation
      setTimeout(() => {
        playActualCloseAnimation(direction);
        //!isBoxOpen.value;
      }, 1000); // assuming the knot animation lasts 1 second
    } else {
      playActualCloseAnimation(direction);
      isBoxOpen.value = direction === 1; // Update the box state based on the direction
    }
  } else {
    console.error('Scene is not defined');
  }
};

const playActualCloseAnimation = (direction: number) => {
  if (bjsScene.value && bjsScene.value.scene && bjsScene.value.candiesInstances) {
    const animationGroup = bjsScene.value.scene.getAnimationGroupByName("Close");
    if (animationGroup) {
      animationGroup.speedRatio = direction;
      animationGroup.play(false);
    } else {
      console.error('Close animation not found');
    }
  } else {
    console.error('Scene or candiesInstances is not defined');
  }
};

const playKnotAnimation = (direction: number, callback?: () => void) => {
  if (bjsScene.value && bjsScene.value.scene) {
    const animationKnot = bjsScene.value.scene.getAnimationGroupByName("Cinta");
    const knotTransformNode = bjsScene.value.scene.getTransformNodeByName("Cinta"); // Replace with the actual name of your TransformNode

    if (animationKnot && knotTransformNode) {
      // Enable the mesh visibility when starting the animation
      knotTransformNode.getChildMeshes().forEach(mesh => mesh.isVisible = true);

      animationKnot.speedRatio = direction;
      animationKnot.play(false);

      if (callback) {
        // Execute the callback when the animation finishes
        animationKnot.onAnimationEndObservable.addOnce(callback);
      }

      // If playing the "off" animation, disable the mesh when animation finishes
      if (direction == -1) {
        animationKnot.onAnimationEndObservable.addOnce(() => {
          knotTransformNode.getChildMeshes().forEach(mesh => mesh.isVisible = false);
        });
      }

    } else {
      console.error('Cinta animation or knot TransformNode not found');
    }
  } else {
    console.error('Scene is not defined');
  }
};

function handleLogin() {
    isAuthenticated.value = true;
    // Additional logic for when the user logs in successfully
  }

function selectCandyForIle(ileIndex, candyId) {
  selectedCandies.value[ileIndex] = candyId;
  IleSelector.setCandyForIle(ileIndex, candyId);
}

function displayModal() {
  if (allCandiesSelected.value) {
    showModal.value = true;  // This will show the modal when all candies are selected
  }
}
/* function displayModal() {
    showModal.value = true;  // This will show the modal when CartButton is clicked
} */

function enableCart() {
  if (allCandiesSelected.value) {
    // Logic to enable cart or show modal goes here
  }
}

function resetAllCandies() {
  selectedCandies.value.fill(null);
  CandyLoader.resetAllAnimations(bjsScene.value.candiesInstances);
  showModal.value = false;
}

function animSwitch(item: any) {
  if (bjsScene.value && bjsScene.value.candiesInstances && bjsScene.value.candiesInstances.length > 0) {
    CandyLoader.candiesPlay(item.id, bjsScene.value.candiesInstances[IleSelector.getIndex()], bjsScene.value.scene, item.name);
    console.log(IleSelector.getIndex());
  } else {
    console.error('candiesInstances is not yet defined');
  }
};

function IlePlus() {
  if (IleSelector.getIndex() < 5) {
    IleSelector.setIndex(IleSelector.getIndex() + 1);
    if (bjsScene.value && bjsScene.value.ilesCone) {
      IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.value.ilesCone);
      currentIleIndex.value = IleSelector.getIndex();
    } else {
      console.error('bjsScene.value or bjsScene.value.ilesCone is undefined');
    }
  }
}

function IleMinus() {
  if (IleSelector.getIndex() > 0) {
    IleSelector.setIndex(IleSelector.getIndex() - 1);
    if (bjsScene.value && bjsScene.value.ilesCone) {
      IleSelector.ileSelect(IleSelector.getIndex(), bjsScene.value.ilesCone);
      currentIleIndex.value = IleSelector.getIndex();
    } else {
      console.error('bjsScene.value or bjsScene.value.ilesCone is undefined');
    }
  }
}

watch(isBoxOpen, (newValue) => {
    console.log('Parent: isBoxOpen updated:', newValue);
});

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