<template>
  <button @click="onClick()">
    Смена видимости
  </button>

  <div class="m-auto w-6/12">
    <div
      id="grid"
      class="game-field"
    >
      <template
        v-for="i in 81"
        :key="i"
      >
        <div class="border border-black cell">
          <color-circle
            :index="i"
            :display="checkPosition(i)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { getRandom, getMapKey, getGridIndex } from './utils/utils';

export default defineComponent({
  name: 'App',
  components: {
    ColorCircle,
  },
  setup() {
    const arr = 'test';

    const iterator = function() {
      const grid = document.getElementById('grid');
      // console.log(grid);
      // console.log(getRandom(9));
    };

    const nextStep = function() {
      for (let index = 0; index < 3; index++) {
        let row, column, gridIndex;
        do {
          row = getRandom(9);
          column = getRandom(9);
          gridIndex = getGridIndex(row, column);
        } while (map.has(gridIndex) && map.size !== 0 && map.size !== 81);

        map.set(gridIndex, { row: row, column: column, active: true });
      }
    };

    const map = new Map();
    nextStep();

    onMounted(() => {
      iterator();
    });

    const onClick = function() {
      nextStep();
    };

    const checkPosition = function(index: number): boolean {
      return map.has(index);
    };

    return {
      arr,
      onClick,
      checkPosition,
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
