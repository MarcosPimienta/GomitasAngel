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
import * as CandyLoader from "../scenes/CandyLoader";

export default {
  name: "RadioButtons",

  setup() {

    const animState = [
    { id: 0, name:"ChocoMellow", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
  ];

    function animSwitch(item: any){
      let animIndex = 0;
      if(item.name == "ChocoMellow")
        animIndex = 0
      else if(item.name == "LifeSavers"){
        animIndex = 1;
      }
      else if(item.name == "Oranges"){
        animIndex = 2;
      }
      CandyLoader.candiesPlay( animIndex, candiesInstances[0], scene);
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