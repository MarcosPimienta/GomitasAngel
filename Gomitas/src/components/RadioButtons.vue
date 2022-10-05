<template>
  <div class="btn-holder">
    <input class="radio-btn" v-model="tutorials"
      type="radio"
      value="ChocoMellows"
      name="ds" />
    <label class="label-text" for="ds">ChocoMellows</label>
        <input class="radio-btn" v-model="tutorials"
          type="radio"
          value="LifeSavers"
          name="ds" />
    <label class="label-text" for="ds">LifeSavers</label>
        <input class="radio-btn" v-model="tutorials"
          type="radio"
          value="Oranges"
          name="ds" />
    <label class="label-text" for="ds">Oranges</label>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "RadioButtons",

  setup() {
    const candyButtons = ref(["ChocoMellows", "LifeSavers", "Oranges"]);

    return {
      candyButtons,
    }
  },
};
</script>
<style lang="css">
@import "../assets/main.css";
</style>