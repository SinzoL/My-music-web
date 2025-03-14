<template>
  <div class="icon-wrapper">
    <svg v-if="isSvgicon" class="icon" aria-hidden="true">
      <use :xlink:href="icon"></use>
    </svg>
    <img v-else class="icon" :src="icon" alt="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    icon: {
      type:String,
      default: "/moontooth.png"
    }
  },
  setup(props) {
    const isSvgicon = computed(() => props.icon.startsWith("#"));
    return {isSvgicon};
  }

});
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;;
  justify-content: center;
}
.icon{
  width: 32px;
  height: 32px;
}
</style>
