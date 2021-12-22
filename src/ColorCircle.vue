<template>
  <transition
    name="bounce"
  >
    <div
      v-if="display"
      :class="[ 'circle', 'color', 'shadow', { display: display }, { active: active }]"
    >
    <!-- {{ active }} -->
    </div>
  </transition>
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
  height: 55px;
  width: 55px;
  visibility: hidden;

}
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
@-moz-keyframes changesize {
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
@-webkit-keyframes changesize {
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
  animation-duration: .4s;
  animation-name: changesize;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  -moz-animation-duration: .4s;
  -webkit-animation-duration: .4s;
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  // 50% {
    // transform: scale(1.25);
  // }
  100% {
    transform: scale(1);
  }
}
</style>
