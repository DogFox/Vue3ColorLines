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
            :color="map.get(index+1).color"
            @click="activateBall(map.get(index+1))"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { getRandom, getGridIndex } from './utils/utils';
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

        const color = getRandomColor();
        map.set(gridIndex, { index: gridIndex, row: row, column: column, active: true, color: color });
      }
    };

    const genMap = function() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const gridIndex = getGridIndex(row, col);
          const color = getRandomColor();
          map.set(gridIndex, { index: gridIndex, row: row, column: col, active: false, color: 'red' });
        }
      }
    };

    const checkIndexInMap = function(index: number) {
      const el = map.get(index);
      return el.active;
    };

    const colorArray = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
    const getRandomColor = function() {
      return colorArray[getRandom(7)];
    };

    const map = reactive(new Map());
    genMap();
    nextMove();

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
    };

    const checkMovedBall = function(ball: TBall) {
      const colVertical = ball.column;
      const rowHorizontal = ball.row;
      const currentColor = ball.color;

      let startRowVertical = ball.row;
      let endRowVertical = ball.row;
      const startColumnHorizontal = ball.column;

      // Идем вверх от шара и смотрим такие же
      let neighborBall = ball;
      while (neighborBall.color === currentColor && map.has(neighborBall.index - 9) && neighborBall.active) {
        neighborBall = map.get(neighborBall.index - 9);
        if (neighborBall.color === currentColor && neighborBall.active) {
          startRowVertical = neighborBall.row;
        }
      }

      // Вернемся назад к шару и смотрим вниз такие же
      neighborBall = ball;
      console.log(neighborBall);
      while (neighborBall.color === currentColor && map.has(neighborBall.index + 9) && neighborBall.active) {
        neighborBall = map.get(neighborBall.index + 9);
        if (neighborBall.color === currentColor && neighborBall.active) {
          endRowVertical = neighborBall.row;
        }
      }

      if (endRowVertical - startRowVertical + 1 >= 5) {
        for (let index = startRowVertical; index <= endRowVertical; index++) {
          const burnedBall = map.get(getGridIndex(index, colVertical));
          burnedBall.active = false;
          console.log(map);
        }
      }
      // console.log(ball,currentRow, currentCol, currentColor);
    };

    const clickOnCell = function(ball: TBall) {
      if (activeRow >= 0 && activeCol >= 0 && ball.active === false && activeBall.active) {
        ball.active = true;
        ball.color = activeBall.color;
        activeBall.active = false;
        activeBall = {} as TBall;
        checkMovedBall(ball);
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
</style>
