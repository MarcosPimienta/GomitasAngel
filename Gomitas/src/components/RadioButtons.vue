<template>
  <div class="btn-holder">
    <div v-for="item in animState" :key="item.id">
      <input class="radio-btn" v-model="tutorials"
        type="radio"
        value="ChocoMellows"
        name="ds"
        @click="animSwitch()" />
      <label class="label-text" for="ds">{{ item.name }}</label>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "RadioButtons",

  setup(attrs,) {

    const animState = [
    { id: 0, name:"ChocoMellow", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
  ];

    const candyButtons = ref(["ChocoMellows", "LifeSavers", "Oranges"]);

    function animSwitch(event){
      if (event.target.value == animState.name){
        animState.Oranges = true;
        console.log(animState.Oranges);
      }
    };

    return {
      animState,
    }
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>