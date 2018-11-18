import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import * as chai from 'chai';
import {
  State as TestState,
  createStore,
} from './test-store';

import {
  State,
  namespace,
} from '../src/index';

Vue.use(Vuex);

describe('State', () => {
  it('normal mapping', () => {
    @Component
    class TestSample extends Vue {
      @State<TestState>('nickname')
      nickname!: string;
    }
    const obj = new TestSample({ store: createStore() });
    chai.assert.equal(obj.nickname, 'taqm');
  });

  it('custom mapping', () => {
    @Component
    class TestSample extends Vue {
      @State<TestState>(state => state.nested.nestedText)
      nestedText!: string;
    }
    const obj = new TestSample({ store: createStore() });
    chai.assert.equal(obj.nestedText, 'nested text');
  });

  it('with namespace', () => {
    interface ModuleState {
      message: string;
    }
    const ns = namespace<TestState>();
    const subNs = namespace<ModuleState>('sample');
    @Component
    class TestSample extends Vue {
      @ns.State('nickname')
      nickname!: string;

      @subNs.State('message')
      message!: string;

      @subNs.State(({ message }) => `custom ${message}`)
      customMessage!: string;
    }
    const store = createStore();
    const obj = new TestSample({ store });
    chai.assert.equal(obj.nickname, 'taqm');
    chai.assert.equal(obj.message, 'hello world');
    chai.assert.equal(obj.customMessage, 'custom hello world');
  });

});
