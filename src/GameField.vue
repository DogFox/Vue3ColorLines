<template>
  <div class="m-auto w-6/12">
    <div
      id="grid"
      class="game-field"
    >
      <!-- <div class="grid grid-cols-9"> -->
      <template
        v-for="i in 81"
        :key="i"
      >
        <div class="border border-black cell">
          <div class="circle">
            {{ i }}
          </div>
        </div>
      </template>
    <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const arr = 'test';

    const iterator = function() {
      const grid = document.getElementById('grid');
      console.log(grid);
    };

    onMounted(() => {
      iterator();
    });

    return {
      arr,

    };
  },
});
</script>

<style lang="scss">
.game-field {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 0px 0px;
}
.cell {
  height: 60px;
   display: flex;
   align-items: center;
   justify-content: center;
}
.circle {
   background-color: red;
   border-radius: 50%;
   border: 1px solid #0F1C3F;
   height: 55px;
   width: 55px;
}
</style>
