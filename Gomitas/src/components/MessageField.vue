<template>
  <label class="label-text">Message</label>
  <input class="name-field" v-model="dynamicText" @input="updateTexture" />
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    onTextUpdated: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const dynamicText = ref('');

    const updateTexture = () => {
      console.log('Updating texture with message:', dynamicText.value);
      props.onTextUpdated(dynamicText.value);
    };

    return {
      dynamicText,
      updateTexture,
    };
  },
});
</script>
<style lang="css">
@import "../assets/main.css";
</style>
