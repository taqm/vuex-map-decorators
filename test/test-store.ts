import Vuex from 'vuex';

export interface State {
  count: number;
  nickname: string;
}

export interface Mutations {
  addCount: { num: number };
}

export interface Getters {
  greeting: string;
}

export interface Actions {
  sampleAction: { num: number };
}
const mutations = {
  addCount: (state: State, payload: { num: number }) => {
    state.count += payload.num;
  },
};
const getters = {
  greeting: (payload: { nickname: string }) => `hello ${payload.nickname}`,
};
const actions = {
  sampleAction: (ctx: any, payload: Actions['sampleAction']) => {
    ctx.commit('addCount', { num: payload.num * 2 });
  },
};

export function createStore() {
  return new Vuex.Store({
    mutations,
    getters,
    actions,
    state: {
      count: 0,
      nickname: 'taqm',
    },
    modules: {
      sample: {
        namespaced: true,
        state: { message: 'hello world' },
      },
    },
  });
}
