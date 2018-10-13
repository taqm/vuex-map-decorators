import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
} from 'vuex';
import { createDecorator, VueDecorator } from 'vue-class-component';

type VuexMapper = (
  | typeof mapState
  | typeof mapMutations
  | typeof mapGetters
  | typeof mapActions
);

type IsNever<N> = [N] extends [never] ? 'T' : 'F';
type IfNotNever<T, R> = {T: {}, F: R }[IsNever<T>];

interface VuexDecorator extends VueDecorator {
  key: string;
}

type DecoratorInterface<S, M, G, A> = (
  & IfNotNever<S, { State: (k: keyof S) => VuexDecorator}>
  & IfNotNever<M, { Mutation: (k: keyof M) => VuexDecorator}>
  & IfNotNever<G, { Getter: (k: keyof G) => VuexDecorator}>
  & IfNotNever<A, { Action: (k: keyof A) => VuexDecorator}>
);

function createVuexDecorator(
  bindTo: 'computed' | 'methods',
  mapper: VuexMapper,
) {
  return <T = unknown>(key: keyof T | string, namesapce?: string | undefined): VuexDecorator => {
    if (typeof(key) !== 'string') {
      throw Error(`key is not string: key=${key}, ns=${namesapce}`);
    }
    const dec = createDecorator((target, prop) => {
      if (!target[bindTo]) {
        target[bindTo] = {};
      }
      target[bindTo]![prop] = (
        namesapce ? mapper(namesapce, [key]) : mapper([key])
      )[key];
    }) as VuexDecorator;
    dec.key = namesapce ? `${namesapce}/${key}` : key;
    return dec;
  };
}

export const State = createVuexDecorator('computed', mapState);
export const Mutation = createVuexDecorator('methods', mapMutations);
export const Getter = createVuexDecorator('computed', mapGetters);
export const Action = createVuexDecorator('methods', mapActions);

export function namespace<
  S = never,
  M = never,
  G = never,
  A = never,
>(n: string): DecoratorInterface<S, M, G, A> {
  return {
    State: (k: keyof S) => State(k as string, n),
    Mutation: (k: keyof M) => Mutation(k as string, n),
    Getter: (k: keyof G) => Getter(k as string, n),
    Action: (k: keyof A) => Action(k as string, n),
  };
}
