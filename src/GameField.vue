<template>
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
.game-field {
  display: grid;
  grid-template-columns: repeat(9, 1fr);;
}
.cell {
  height: 60px;
}
</style>
