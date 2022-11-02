<template>
  <div class="btn-holder">
    <div v-for="item in animState" :key="item.id">
      <input class="radio-btn" v-model="tutorials"
        type="radio"
        value="ChocoMellows"
        name="ds"
        @click="animSwitch(item)" />
      <label class="label-text" for="ds">{{ item.name }}</label>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import { objectScene } from "../scenes/Scene";

export default {
  name: "RadioButtons",

  setup() {
    const animState = [
    { id: 0, name:"ChocoMellow", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
  ];

    function animSwitch(item: any){
      if(item.name == "ChocoMellow"){
        console.log(item.name);
        objectScene.getAnimation()
      }
      else if(item.name == "LifeSavers"){
        console.log(item.name);
      }
      else if(item.name == "Oranges"){
        console.log(item.name);
      }
    };

    return {
      animState, animSwitch
    }
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>