<template>
  <div
    :class="[ 'circle', 'color', 'shadow', { display: display}, {active: active}]"
  >
    <!-- {{ active }} -->
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
    active: { type: Boolean, default: false },
    color: { type: String, required: true },
  },
});
</script>

<style lang="scss">
.circle {
  border-radius: 50%;
  // border: 1px solid #0F1C3F;
  height: 55px;
  width: 55px;
  visibility: hidden;

}
// .color {
//   background-color: v-bind(color);
// }
@keyframes changesize {
  from {
    margin-top: -4px;
    height: 55px;
    width: 55px;
  }

  to {
    margin-top: 4px;
    height: 54px;
    width: 59px;
  }
}

.display {
  visibility: visible;
}
.active {
  animation-duration: .5s;
  animation-name: changesize;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  -moz-animation-duration: .5s;
  -webkit-animation-duration: .5s;
  -moz-animation-name: changesize;
  -webkit-animation-name: changesize;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
.shadow {
  background: -webkit-radial-gradient(20px 20px, circle, v-bind(color), rgb(51, 48, 48));
}
</style>
