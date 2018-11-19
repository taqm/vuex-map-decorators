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
export type IfNotNever<T, R> = {T: {}, F: R }[IsNever<T>];

interface VuexDecorator extends VueDecorator {
  key: string;
}

type DecoratorMaker<K> = (k: K) => VuexDecorator;
type DecoratorInterface<S, M, G, A> = (
  & IfNotNever<S, { State: DecoratorMaker<StateKey<S>> }>
  & IfNotNever<M, { Mutation: DecoratorMaker<MutationKey<M>> }>
  & IfNotNever<G, { Getter: DecoratorMaker<keyof G> }>
  & IfNotNever<A, { Action: DecoratorMaker<keyof A> }>
);

type StateIntercepter<T> = (state: T) => any;
type MutationsIntercepter<T, K extends keyof T = keyof T> = {
  (
    commit: (key: K, payload?: T[K]) => void,
    ...args: any[]
  ): void;
};
type GettersIntercepter<T> = {
  (getters: T, param?: any): any;
};
type ActionsIntercepter<T> = {
  (dispatch: <K extends keyof T>(key: K, payload: T[K]) => void): void;
};

type Interceptor<T> = (
  | StateIntercepter<T>
  | MutationsIntercepter<T>
  // | GettersIntercepter<T>
  // | ActionsIntercepter<T>
);

function createVuexDecorator(
  bindTo: 'computed' | 'methods',
  mapper: VuexMapper,
) {
  return <
    T = unknown,
    I extends (keyof T | Interceptor<T>) = keyof T
  >(key: I, namespace?: string | undefined): VuexDecorator => {
    const dec = createDecorator((target, prop) => {
      if (!target[bindTo]) {
        target[bindTo] = {};
      }
      const o: any = [{ [prop]: key }];
      if (namespace) o.unshift(namespace);
      target[bindTo]![prop] = mapper.apply(target, o)[prop];
    }) as VuexDecorator;

    if (typeof(key) === 'string') {
      dec.key = namespace ? `${namespace}/${key}` : key;
    }
    return dec;
  };
}

type StateKey<S> = keyof S | StateIntercepter<S>;
type MutationKey<M> = keyof M | MutationsIntercepter<M>;
type GetterKey<G> = keyof G; // | GettersIntercepter<G>;
type ActionKey<A> = keyof A; // | ActionsIntercepter<A>;

type IState = <S>(key: StateKey<S>, ns?: string) => VuexDecorator;
type IMutation = <S>(key: MutationKey<S>, ns?: string) => VuexDecorator;
type IGetter = <S>(key: GetterKey<S>, ns?: string) => VuexDecorator;
type IAction = <S>(key: ActionKey<S>, ns?: string) => VuexDecorator;

const cvd = createVuexDecorator; // alias
export const State = cvd('computed', mapState) as IState;
export const Mutation = cvd('methods', mapMutations) as IMutation;
export const Getter = cvd('computed', mapGetters) as IGetter;
export const Action = cvd('methods', mapActions) as IAction;

export function namespace<
  S = never,
  M = never,
  G = never,
  A = never,
>(n?: string): DecoratorInterface<S, M, G, A> {
  return {
    State: (k: StateKey<S>) => State<S>(k, n),
    Mutation: (k: MutationKey<M>) => Mutation<M>(k, n),
    Getter: (k: GetterKey<G>) => Getter<G>(k, n),
    Action: (k: ActionKey<A>) => Action<A>(k, n),
  };
}
