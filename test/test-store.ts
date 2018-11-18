import Vuex from 'vuex';

export interface State {
  count: number;
  nickname: string;
  nested: {
    nestedText: string;
  };
}

export interface Mutations {
  addCount: { num: number };
}

export interface Getters {
  greeting: string;
  greet: (name: string) => string;
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
  greeting: (state: { nickname: string }) => `hello ${state.nickname}`,
  greet: (state: { nickname: string }) => (pre: string) => (
    `${pre} ${state.nickname}`
  ),
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
      nested: {
        nestedText: 'nested text',
      },
    },
    modules: {
      sample: {
        mutations,
        namespaced: true,
        state: {
          message: 'hello world',
          count: 0,
        },
      },
    },
  });
}
