import Vue from 'vue';
import Vuex from 'vuex';
import Component from 'vue-class-component';
import * as chai from 'chai';
import {
  State as TestState,
  Mutations as TestMutations,
  Getters as TestGetters,
  Actions as TestActions,
  createStore,
} from './test-store';

import {
  State,
  Mutation,
  Getter,
  Action,
  namespace,
} from '../src/index';

Vue.use(Vuex);

import './state.test';
import './mutation.test';
import './getter.test';
import './action.test';

describe('bindint test (namespace)', () => {
  it('Sample', () => {
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
    }
    const store = createStore();
    const obj = new TestSample({ store });
    chai.assert.equal(obj.nickname, 'taqm');
    chai.assert.equal(obj.message, 'hello world');
  });
});

describe('key test', () => {
  it('default', () => {
    chai.assert.equal(State<TestState>('nickname').key, 'nickname');
    chai.assert.equal(Mutation<TestMutations>('addCount').key, 'addCount');
    chai.assert.equal(Getter<TestGetters>('greeting').key, 'greeting');
    chai.assert.equal(Action<TestActions>('sampleAction').key, 'sampleAction');
  });

  it('namespace', () => {
    const ns = namespace<
      TestState,
      TestMutations,
      TestGetters,
      TestActions>('sample');

    chai.assert.equal(ns.State('nickname').key, 'sample/nickname');
    chai.assert.equal(ns.Mutation('addCount').key, 'sample/addCount');
    chai.assert.equal(ns.Getter('greeting').key, 'sample/greeting');
    chai.assert.equal(ns.Action('sampleAction').key, 'sample/sampleAction');
  });
});
