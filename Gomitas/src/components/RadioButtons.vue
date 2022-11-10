<template>
  <div class="btn-holder">
    <div v-for="item in animState" :key="item.id">
      <input class="radio-btn" v-model="tutorials"
        type="radio"
        value="ChocoMellows"
        name="ds"
        @click="emit('animationPlay', item)" />
      <label class="label-text" for="ds">{{ item.name }}</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";

  const emit = defineEmits<{
  (e: 'animationPlay', object: AnimState): void
  }>();

    interface AnimState {
      id: number;
      name: string;
      state: boolean;
    };

    const animState: AnimState[] = [
    { id: 0, name:"ChocoMellow", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
  ];

</script>
<style lang="css">
@import "../assets/main.css";
</style>