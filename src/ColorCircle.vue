<template>
  <div
    :class="[ 'circle', { display: display}]"
  >
    {{ index }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  props: {
    index: { type: Number, default: 0 },
    display: { type: Boolean, default: false },
  },
});
</script>

<style lang="scss">
.circle {
  background-color: red;
  border-radius: 50%;
  border: 1px solid #0F1C3F;
  height: 55px;
  width: 55px;
  // display: none;
  visibility: hidden;

}
.display {
  visibility: visible;
}
</style>
