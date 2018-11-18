import { VueDecorator } from 'vue-class-component';
declare type IsNever<N> = [N] extends [never] ? 'T' : 'F';
export declare type IfNotNever<T, R> = {
    T: {};
    F: R;
}[IsNever<T>];
interface VuexDecorator extends VueDecorator {
    key: string;
}
declare type DecoratorMaker<K> = (k: K) => VuexDecorator;
declare type DecoratorInterface<S, M, G, A> = (IfNotNever<S, {
    State: DecoratorMaker<StateKey<S>>;
}> & IfNotNever<M, {
    Mutation: DecoratorMaker<MutationKey<M>>;
}> & IfNotNever<G, {
    Getter: DecoratorMaker<keyof G>;
}> & IfNotNever<A, {
    Action: DecoratorMaker<keyof A>;
}>);
declare type StateIntercepter<T> = (state: T) => any;
declare type MutationsIntercepter<T, K extends keyof T = keyof T> = {
    (commit: (key: K, payload?: T[K]) => void, ...args: any[]): void;
};
declare type StateKey<S> = keyof S | StateIntercepter<S>;
declare type MutationKey<M> = keyof M | MutationsIntercepter<M>;
declare type GetterKey<G> = keyof G;
declare type ActionKey<A> = keyof A;
declare type IState = <S>(key: StateKey<S>, ns?: string) => VuexDecorator;
declare type IMutation = <S>(key: MutationKey<S>, ns?: string) => VuexDecorator;
declare type IGetter = <S>(key: GetterKey<S>, ns?: string) => VuexDecorator;
declare type IAction = <S>(key: ActionKey<S>, ns?: string) => VuexDecorator;
export declare const State: IState;
export declare const Mutation: IMutation;
export declare const Getter: IGetter;
export declare const Action: IAction;
export declare function namespace<S = never, M = never, G = never, A = never>(n?: string): DecoratorInterface<S, M, G, A>;
export {};
