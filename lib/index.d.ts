import { VueDecorator } from 'vue-class-component';
declare type IsNever<N> = [N] extends [never] ? 'T' : 'F';
export declare type IfNotNever<T, R> = {
    T: {};
    F: R;
}[IsNever<T>];
interface VuexDecorator extends VueDecorator {
    key: string;
}
declare type DecoratorInterface<S, M, G, A> = (IfNotNever<S, {
    State: (k: keyof S) => VuexDecorator;
}> & IfNotNever<M, {
    Mutation: (k: keyof M) => VuexDecorator;
}> & IfNotNever<G, {
    Getter: (k: keyof G) => VuexDecorator;
}> & IfNotNever<A, {
    Action: (k: keyof A) => VuexDecorator;
}>);
export declare const State: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Mutation: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Getter: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Action: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare function namespace<S = never, M = never, G = never, A = never>(n: string): DecoratorInterface<S, M, G, A>;
export {};
