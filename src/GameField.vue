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
        <div
          class="border border-black cell"
          @click="clickOnCell(map.get(index+1))"
        >
          <color-circle
            :index="index+1"
            :display="map.get(index+1).active"
            @click="activateBall(map.get(index+1))"
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
import { TBall } from './types';

export default defineComponent({
  name: 'App',
  components: {
    ColorCircle,
  },
  setup() {
    const nextMove = function() {
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
    nextMove();

    onMounted(() => {
      // iterator();
    });

    const onClick = function() {
      nextMove();
    };

    let activeRow = -1;
    let activeCol = -1;
    let activeBall = {} as TBall;

    const activateBall = function(ball: TBall) {
      if (ball.active) {
        activeRow = ball.row;
        activeCol = ball.column;
        activeBall = ball;
      }
      console.log(ball);
      console.log(activeRow, activeCol);
    };

    const clickOnCell = function(ball: TBall) {
      if (activeRow >= 0 && activeCol >= 0 && ball.active === false && activeBall.active) {
        ball.active = true;
        activeBall.active = false;
        activeBall = {} as TBall;
        nextMove();
      }
    };

    return {
      map,
      onClick,
      activateBall,
      clickOnCell,
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
