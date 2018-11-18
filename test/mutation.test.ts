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

  it('namespaced normal', () => {
    const ns = namespace<never, Mutations>('sample');
    @Component
    class TestSample extends Vue {
      @ns.Mutation('addCount')
      addCount!: (param: { num: number }) => void;
    }
    const store = createStore() as any;
    const obj = new TestSample({ store });
    obj.addCount({ num: 4 });
    chai.assert.equal(store.state.sample.count, 4);
  });

  it('namespaced custom', () => {
    const ns = namespace<never, Mutations>('sample');
    @Component
    class TestSample extends Vue {
      @ns.Mutation((commit, num) => {
        commit('addCount', { num });
      })
      addCount!: (num: number) => void;
    }
    const store = createStore() as any;
    const obj = new TestSample({ store });
    obj.addCount(6);
    chai.assert.equal(store.state.sample.count, 6);
  });
});
