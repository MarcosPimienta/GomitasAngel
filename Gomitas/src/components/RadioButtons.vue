<template>
  <div class="btn-holder">
    <div v-for="item in animState" :key="item.id">
      <input class="radio-btn" v-model="tutorials"
        type="radio"
        value="ChocoMellows"
        name="ds" />
      <label class="label-text" for="ds">ChocoMellows</label>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "RadioButtons",

  setup() {

    const animState = [
    { id: 0, name:"ChocoMellow", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
  ];

    const candyButtons = ref(["ChocoMellows", "LifeSavers", "Oranges"]);

    function animSwitch(event){
      if (event.target.value == animState.name){
        animState.Oranges = true;
        console.log(anims.Oranges);
      }
    };

    return {
      candyButtons,
    }
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>