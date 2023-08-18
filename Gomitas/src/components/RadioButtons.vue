<template>
  <div>
    <div v-for="item in animState" :key="item.id">
      <input class="radio-btn" v-model="tutorials"
        type="radio"
        value="ChocoMellows"
        name="ds"
        @click="handleClick(item)" />
      <label class="label-text" for="ds">{{ item.name }}</label>
    </div>
  </div>
</template>
<script setup lang="ts">

const emit = defineEmits<{
  (e: 'animationPlay', object: AnimState): void;
  (e: 'candySelected', candyId: number): void;
}>();

    interface AnimState {
      id: number;
      name: string;
      state: boolean;
    };

    const animState: AnimState[] = [
    { id: 0, name:"ChocoMellows", state: false },
    { id: 1, name:"LifeSavers", state: false },
    { id: 2, name:"Oranges", state: false },
    { id: 3, name:"Ribbons", state: false },
    { id: 4, name:"Strawberries", state: false },
    { id: 5, name:"Worms", state: false },
  ];

  function handleClick(item: AnimState) {
  emit('animationPlay', item);
  emit('candySelected', item.id);
}

</script>
<style lang="css">
@import "../assets/main.css";
</style>