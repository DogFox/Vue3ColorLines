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
import { TBall } from './types';
import { verticalProcessing, genMap, nextMove, horizontalProcessing, rightDiagonalProcessing, leftDiagonalProcessing, burnBalls } from './processing';

export default defineComponent({
  name: 'App',
  components: {
    ColorCircle,
  },
  setup() {
    const map = genMap();
    nextMove(map);

    const onClick = function() {
      nextMove(map);
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
      const burnedBalls = [
        ...verticalProcessing(ball, map),
        ...horizontalProcessing(ball, map),
        ...leftDiagonalProcessing(ball, map),
        ...rightDiagonalProcessing(ball, map),
      ];
      burnBalls(burnedBalls, map);
    };

    const clickOnCell = function(ball: TBall) {
      if (activeRow >= 0 && activeCol >= 0 && ball.active === false && activeBall.active) {
        ball.active = true;
        ball.color = activeBall.color;
        activeBall.active = false;
        activeBall = {} as TBall;
        checkMovedBall(ball);
        nextMove(map);
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
