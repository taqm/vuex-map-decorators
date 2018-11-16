import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import * as chai from 'chai';
import {
  createStore,
  Actions,
} from './test-store';

import {
  Action,
} from '../src/index';

Vue.use(Vuex);

describe('Getters', () => {
  it('normal mapping', () => {
    @Component
    class TestSample extends Vue {
      @Action<Actions>('sampleAction')
      sampleAction!: (payload: { num: number }) => {};
    }
    const store = createStore();
    const obj = new TestSample({ store });
    chai.assert.equal(store.state.count, 0);
    obj.sampleAction({ num: 5 });
    chai.assert.equal(store.state.count, 10);
  });
});
