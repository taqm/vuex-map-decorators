import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import * as chai from 'chai';
import {
  createStore,
  Getters,
} from './test-store';

import {
  Getter,
} from '../src/index';

Vue.use(Vuex);

describe('Getters', () => {
  it('normal mapping', () => {
    @Component
    class TestSample extends Vue {
      @Getter<Getters>('greeting')
      greeting!: string;
    }
    const store = createStore();
    const obj = new TestSample({ store });
    chai.assert.equal(obj.greeting, 'hello taqm');
  });
});
