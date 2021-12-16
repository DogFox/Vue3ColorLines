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
        v-for="(item, index) in map"
        :key="index"
      >
        <div class="border border-black cell">
          <color-circle
            :index="index+1"
            :display="map.get(index+1).active"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { getRandom, getMapKey, getGridIndex } from './utils/utils';

export default defineComponent({
  name: 'App',
  components: {
    ColorCircle,
  },
  setup() {
    const nextStep = function() {
      for (let index = 0; index < 3; index++) {
        let row, column, gridIndex;
        do {
          row = getRandom(9);
          column = getRandom(9);
          gridIndex = getGridIndex(row, column);
        } while (checkIndexInMap(gridIndex));

        map.set(gridIndex, { row: row, column: column, active: true });
      }
    };

    const genMap = function() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const gridIndex = getGridIndex(row, col);
          map.set(gridIndex, { row: row, column: col, active: false });
        }
      }
    };

    const checkIndexInMap = function(index: number) {
      const el = map.get(index);
      return el.active;
    };

    // const map = new Map();
    const map = reactive(new Map());
    genMap();
    nextStep();

    onMounted(() => {
      // iterator();
    });

    const onClick = function() {
      nextStep();
    };

    const checkPosition = function(index: string): boolean {
      return map.has(index);
    };

    return {
      map,
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
