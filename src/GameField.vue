<template>
  <div>
    Score: {{ currentScore }}
    MaxScore: {{ currentScore }}
  </div>
  <div
    id="grid"
    class="m-auto game-field "
  >
    <template
      v-for="[index, item] in map"
      :key="index"
    >
      <div
        class="cell"
        @click="clickOnCell(item)"
      >
        <color-circle
          :index="index"
          :display="item.display"
          :active="item.active"
          :color="item.color"
          @click.stop="activateBall(item)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { TBall } from './types';
import { genMap, nextMove, checkMovedBall, checkRoute } from './processing';
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
      if (ball.display) {
        if (activeBall) {
          activeBall.active = false;
        }
        activeRow = ball.row;
        activeCol = ball.column;
        activeBall = ball;
        ball.active = true;
      }
    };

    const clickOnCell = function(ball: TBall) {
      const availablePosition = checkRoute(activeBall, ball, map);
      if (!availablePosition) {
        return;
      }

      if (activeRow >= 0 && activeCol >= 0 && ball.display === false && activeBall.display) {
        ball.display = true;
        ball.color = activeBall.color;
        activeBall.display = false;
        activeBall = {} as TBall;
        if (!checkMovedBall(ball, map)) {
          nextMove(map);
        }
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
  width: 540px;

  border-top: 1px solid black;
  border-left: 1px solid black;
}
.game-field > div {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}
.cell {
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(226, 226, 226);
  // background: linear-gradient(90deg, rgba(175,175,175,1) 0%, rgba(105,102,102,1) 100%);
}

</style>
