import { MutationTree, GetterTree, createStore } from 'vuex';

type TLineState = {
  score: number,
  maxScore: number,
  finished: boolean,
};

type TLineMutations<S = TLineState> = {
  SET_SCORE(state: S, score: number): void;
  SET_FINISHED(state: S, status: boolean): void;
}

type TLinesGetters = {
  getScore(state: TLineState): number;
  getMaxScore(state: TLineState): number;
  getFinished(state: TLineState): boolean;
}

export const state: TLineState = {
  score: 0,
  maxScore: 0,
  finished: false,
};

export const mutations: MutationTree<TLineState> & TLineMutations = {
  SET_SCORE(state, count) {
    state.score += count;
    if (state.score > state.maxScore) {
      state.maxScore = state.score;
    }
  },
  SET_FINISHED(state, status) {
    state.finished = status;
  },
};

export const getters: GetterTree<TLineState, TLineState> & TLinesGetters = {
  getScore(state: TLineState): number {
    return state.score;
  },
  getMaxScore(state: TLineState): number {
    return state.maxScore;
  },
  getFinished(state: TLineState): boolean {
    return state.finished;
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
