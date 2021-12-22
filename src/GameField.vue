<template>
  <div>
    Score: {{ currentScore }}
    MaxScore: {{ currentScore }}
  </div>
  <div
    id="grid"
    :class="[ 'm-auto', 'game-field', { 'game-over': gameOver }]"
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
  <h1
    v-if="gameOver"
    class="text-3xl font-bold end-game"
  >
    Game Over
  </h1>
  <button
    class="button"
    @click="newGame()"
  >
    New Game
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from 'vue';
import ColorCircle from './ColorCircle.vue';
import { TBall } from './types';
import { genMap, nextMove, checkMovedBall, checkRoute, clearMap } from './processing';
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
    const gameOver = computed(() => store.getters.getFinished);

    let activeRow = -1;
    let activeCol = -1;
    let activeBall = reactive({} as TBall);

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
      if (!activeBall.active) {
        return;
      }
      const availablePosition = checkRoute(activeBall, ball, map);
      if (!availablePosition) {
        return;
      }

      if (activeRow >= 0 && activeCol >= 0 && ball.display === false && activeBall.display) {
        ball.display = true;
        ball.color = activeBall.color;
        activeBall.display = false;
        activeBall.active = false;
        activeBall = {} as TBall;
        if (!checkMovedBall(ball, map)) {
          nextMove(map);
        }
      }
    };
    const newGame = function() {
      clearMap(map);
      nextMove(map);
      store.commit('SET_FINISHED', false);
      store.commit('SET_SCORE', 0);
    };

    return {
      map,
      activateBall,
      clickOnCell,
      newGame,
      currentScore,
      currentMaxScore,
      gameOver,
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
.game-over {
  opacity: 20%;
}
.end-game {
    position: relative;
    top: -350px;
}
.button {
  background-color: white;
  color: black;
  border: 2px solid #2c3e50;
  border-radius: .5em;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  padding: 1em;
  margin: 1em;
}

.button:hover {
  background-color: #2c3e50;
  color: white;
}
</style>
