<template>
  <div>
    Score: {{ currentScore }}
    MaxScore: {{ currentScore }}
  </div>
  <div class="m-auto w-6/12 py-10">
    <div
      id="grid"
      class="game-field"
    >
      <template
        v-for="[index, item] in map"
        :key="index"
      >
        <div
          class="border border-black cell"
          @click="clickOnCell(item)"
        >
          <color-circle
            :index="index"
            :display="item.active"
            :color="item.color"
            @click.stop="activateBall(item)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { TBall } from './types';
import { verticalProcessing, genMap, nextMove, horizontalProcessing, rightDiagonalProcessing, leftDiagonalProcessing, burnBalls, checkRoute } from './processing';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    ColorCircle,
  },
  setup() {
    const store = useStore();
    const map = genMap();
    nextMove(map);

    const currentScore = computed(() => store.getters.getScore);
    const currentMaxScore = computed(() => store.getters.getMaxScore);

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
      if (burnedBalls.length > 0) {
        burnBalls(burnedBalls, map);
      } else {
        nextMove(map);
      }
    };

    const clickOnCell = function(ball: TBall) {
      const availablePosition = checkRoute(activeBall, ball, map);
      if (!availablePosition) {
        return;
      }

      if (activeRow >= 0 && activeCol >= 0 && ball.active === false && activeBall.active) {
        ball.active = true;
        ball.color = activeBall.color;
        activeBall.active = false;
        activeBall = {} as TBall;
        checkMovedBall(ball);
      }
    };

    return {
      map,
      activateBall,
      clickOnCell,
      currentScore,
      currentMaxScore,
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
