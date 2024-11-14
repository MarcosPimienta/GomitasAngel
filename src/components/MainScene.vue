<template>
  <!-- <AuthLogin v-if="!isAuthenticated" @loginSuccessful="handleLogin" /> -->
  <div>
    <div class="btn-holder" :class="{ disabled: isLoading }">
      <img class="title_image" src="/svgs/Gomitas_Logo.svg"/>
      <IleButtons :disabled="!isBoxOpen" @plus="IlePlus" @minus="IleMinus"/>
      <RadioButtons
      :disabled="!isBoxOpen"
      :key="currentIleIndex ?? 0"
      :selectedCandyId="selectedCandies[IleSelector.getIndex()]"
      @animationPlay="animSwitch"
      @candySelected="selectCandyForIle(IleSelector.getIndex(), $event)" />
      <NameField @text-updated="handleUpdatedText" />
      <MessageField @text-updated="handleUpdatedMsg" />
      <CloseSwitch id="closeSwitch" :playCloseAnimation="playCloseAnimation" :isBoxOpen="isBoxOpen" @update:isBoxOpen="isBoxOpen = $event"/>
      <KnotSwitch :disabled="isBoxOpen" id="knotSwitch" :playKnotAnimation="playKnotAnimation" :changeKnotColor="changeKnotColor" :isKnotOn="isKnotOn" @update:isKnotOn="isKnotOn = $event"/>
      <div class="round-buttons">
      <CartButton :isEnabled="allCandiesSelected" @showModal="displayModal"/>
      <ResetButton :disabled="!canResetCandies" @reset="resetAllCandies"/>
      </div>
    </div>
    <CartModal
      class="modal"
      :show="showModal"
      :selectedCandies="selectedCandies"
      :selectedKnotColor="selectedKnotColor"
      :knotPresent="knotPresent"
      :allCandies="allCandies"
      :nameText="nameText"
      :messageText="messageText"
      @close="showModal = false"
    />
    <canvas class="bjsCanvas" ref="bjsCanvas"/>
  </div>
</template>

<script setup lang="ts">
import type { Scene, Engine, Mesh } from "@babylonjs/core";
import { Color4, PBRMaterial } from '@babylonjs/core';
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { createScene } from "../babylon/Scene";
import * as CandyLoader from "../babylon/CandyLoader";
import * as IleSelector from "../babylon/IleSelector";
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
const selectedKnotColor = ref("Red"); // Default to "None" or any default value
const knotPresent = ref(false);
const nameText = ref('');  // Reactive property for the name text
const messageText = ref('');  // Reactive property for the message text

const allCandies = [
  { id: 0, name:"ChocoMellows", imageUrl:"/GomitasAngel/svgs/Chocmellows.svg"},
  { id: 1, name:"Cables", imageUrl:"/GomitasAngel/svgs/Cables.svg"},
  { id: 2, name:"LifeSavers", imageUrl:"/GomitasAngel/svgs/LifeSavers.svg"},
  { id: 3, name:"Ribbons", imageUrl:"/GomitasAngel/svgs/Ribbons.svg"},
  { id: 4, name:"Strawberries", imageUrl:"/GomitasAngel/svgs/Strawberries.svg"},
  { id: 5, name:"Worms", imageUrl:"/GomitasAngel/svgs/Worms.svg"},
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

// Modified computed property that also checks if the box is open
const canResetCandies = computed(() => {
  return isBoxOpen.value && selectedCandies.value.some(candy => candy !== null);
});

const bjsCanvas = ref(null);
const modalKey = ref(0);
const currentIleIndex = ref<number | null>(null);
let bjsScene: Ref<SceneReturnType | null> = ref(null)
let ileConeMesh: Mesh | null = null;
let isLoading = ref(true);

onMounted(async () => {
  if (bjsCanvas.value) {
    try {
      const sceneObject = await createScene(bjsCanvas.value, (selectedIndex) => {
        currentIleIndex.value = selectedIndex;
      }, isBoxOpen);
      bjsScene.value = sceneObject;
      isLoading.value = false;
    } catch (error) {
      console.error("Error loading scene:", error);
      // Handle the error appropriately
    }
  }
});

const handleUpdatedText = (updatedText: string) => {
  console.log('Updating texture with text:', updatedText);
  if (bjsScene.value && bjsScene.value.updateText) {
    console.log("Calling updateText Function");
    bjsScene.value.updateText(updatedText); // Call the updateText function with the new text
  } else {
    console.log("updateText Function is Undefined");
  }
  nameText.value = updatedText;
};

const handleUpdatedMsg = (updatedText: string) => {
  console.log('Updating texture with message:', updatedText);
  if (bjsScene.value && bjsScene.value.updateText) {
    console.log("Calling updateText Function");
    bjsScene.value.updateMsg(updatedText); // Call the updateText function with the new text
  } else {
    console.log("updateText Function is Undefined");
  }
  messageText.value = updatedText;
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

const changeKnotColor = (color: string, callback?: () => void) => {
  console.log(`Attempting to change knot color to: ${color}`);
  selectedKnotColor.value = color;
  console.log("Selected Knot Color:", selectedKnotColor.value);

  if (bjsScene.value && bjsScene.value.scene) {
    const knotTransformNode = bjsScene.value.scene.getTransformNodeByName("Cinta");

    if (knotTransformNode) {
      console.log('Knot TransformNode found');
      knotTransformNode.getChildMeshes().forEach(mesh => {
        if (mesh.material && mesh.material instanceof PBRMaterial) {
          console.log(`Changing color of mesh: ${mesh.name}`);
          let pbrMaterial = mesh.material;
          switch (color) {
            case 'Red':
              pbrMaterial.albedoColor = Color4.FromHexString("#DC2C1B")
              break;
            case 'Gold':
              pbrMaterial.albedoColor = Color4.FromHexString("#C09B6D")
              break;
            // Add more cases for other colors as needed
          }
        } else {
          console.log(`Mesh ${mesh.name} does not have a PBRMaterial`);
        }
      });
    } else {
      console.error('Knot TransformNode not found');
    }
  } else {
    console.error('Scene is not defined');
  }
};

const toggleKnotPresence = (presence: boolean) => {
  knotPresent.value = presence;  // Update presence
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
  toggleKnotPresence(direction === 1);
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
  if (bjsScene.value) {
    bjsScene.value.ilesCone.isVisible = newValue;
  }
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