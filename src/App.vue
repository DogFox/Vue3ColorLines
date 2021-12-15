<template>
  <div class="border-solid border-2">
    fsfs

    <h1 class="text-3xl font-bold underline decoration-wavy">
      Hello world!
    </h1>
  </div>
  <div class="m-auto w-6/12">
    <div class="game-field">
      <!-- <div class="grid grid-cols-9"> -->
      <template
        v-for="i in 81"
        :key="i"
      >
        <div class="border border-black cell">
          {{ i }}
        </div>
      </template>
    <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const arr = 'test';

    return {
      arr,
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
.game-field {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px;
}
.cell {
  height: 50px;
}
</style>
