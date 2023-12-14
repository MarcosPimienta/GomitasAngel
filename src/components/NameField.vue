<template>
  <label class="label-text">Name</label>
  <input class="name-field" v-model="dynamicText" @input="updateTexture" maxlength="20"/>
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
      console.log('Updating texture with text:', dynamicText.value);
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
