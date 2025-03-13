<template>
  <div class="background" :style="backgroundStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Background",
  props: {
    imageUrl: {
      type: String,
      default: require("@/assets/images/music.jpg"),
    },
    backgroundSize: {
      type: String,
      default: "cover",
    },
    backgroundPosition: {
      type: String,
      default: "center",
    },
    backgroundRepeat: {
      type: String,
      default: "no-repeat",
    },
  },
  setup(props) {
    const backgroundStyle = computed(() => ({
      backgroundImage: `url(${props.imageUrl})`,
      backgroundSize: props.backgroundSize,
      backgroundPosition: props.backgroundPosition,
      backgroundRepeat: props.backgroundRepeat,
    }));

    return {
      backgroundStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
}
</style>
