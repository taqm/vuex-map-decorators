import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import * as chai from 'chai';
import {
  createStore,
  Mutations,
} from './test-store';

import {
  Mutation,
  namespace,
} from '../src/index';

Vue.use(Vuex);

describe('Mutation', () => {
  it('normal mapping', () => {
    @Component
    class TestSample extends Vue {
      @Mutation<Mutations>('addCount')
      addCount!: (param: { num: number }) => void;
    }
    const store = createStore();
    const obj = new TestSample({ store });
    chai.assert.equal(store.state.count, 0);
    obj.addCount({ num: 5 });
    chai.assert.equal(store.state.count, 5);
  });

  it('custom mapping', () => {
    @Component
    class TestSample extends Vue {
      @Mutation<Mutations>(
        (commit, num) => commit('addCount', { num }),
      )
      addCount!: (num: number) => void;
    }
    const store = createStore();
    const obj = new TestSample({ store });
    obj.addCount(3);
    chai.assert.equal(store.state.count, 3);
  });
});
