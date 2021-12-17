import { MutationTree, GetterTree, createStore } from 'vuex';

type TLineState = {
  score: number,
  maxScore: number,
};

type TLineMutations<S = TLineState> = {
  SET_SCORE(state: S, score: number): void;
}

type TLinesGetters = {
  getScore(state: TLineState): number;
  getMaxScore(state: TLineState): number;
}

export const state: TLineState = {
  score: 0,
  maxScore: 0,
};

export const mutations: MutationTree<TLineState> & TLineMutations = {
  SET_SCORE(state, count) {
    state.score += count;
    if (state.score > state.maxScore) {
      state.maxScore = state.score;
    }
  },
};

export const getters: GetterTree<TLineState, TLineState> & TLinesGetters = {
  getScore(state: TLineState): number {
    return state.score;
  },
  getMaxScore(state: TLineState): number {
    return state.maxScore;
  },
};

export default createStore({
  state,
  mutations,
  getters,
  actions: {
  },
  modules: {
  },
});
