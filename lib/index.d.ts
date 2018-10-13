import { VueDecorator } from 'vue-class-component';
declare type IsNever<N> = [N] extends [never] ? 'T' : 'F';
export declare type IfNotNever<T, R> = {
    T: {};
    F: R;
}[IsNever<T>];
interface VuexDecorator extends VueDecorator {
    key: string;
}
declare type DecoratorMaker<T> = (k: keyof T) => VuexDecorator;
declare type DecoratorInterface<S, M, G, A> = (IfNotNever<S, {
    State: DecoratorMaker<S>;
}> & IfNotNever<M, {
    Mutation: DecoratorMaker<M>;
}> & IfNotNever<G, {
    Getter: DecoratorMaker<G>;
}> & IfNotNever<A, {
    Action: DecoratorMaker<A>;
}>);
export declare const State: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Mutation: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Getter: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare const Action: <T = unknown>(key: keyof T, namesapce?: string | undefined) => VuexDecorator;
export declare function namespace<S = never, M = never, G = never, A = never>(n: string): DecoratorInterface<S, M, G, A>;
export {};
