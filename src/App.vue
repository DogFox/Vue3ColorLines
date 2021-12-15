<template>
  <h1 class="text-3xl font-bold ">
    Color Lines!
  </h1>
  <game-field class="py-10" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameField from './GameField.vue';

export default defineComponent({
  name: 'App',
  components: {
    GameField,
  },
  setup() {
    return {
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
