"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_1 = require("vuex");
var vue_class_component_1 = require("vue-class-component");
function createVuexDecorator(bindTo, mapper) {
    return function (key, namesapce) {
        if (typeof (key) !== 'string') {
            throw Error("key is not string: key=" + key + ", ns=" + namesapce);
        }
        var dec = vue_class_component_1.createDecorator(function (target, prop) {
            if (!target[bindTo]) {
                target[bindTo] = {};
            }
            target[bindTo][prop] = (namesapce ? mapper(namesapce, [key]) : mapper([key]))[key];
        });
        dec.key = namesapce ? namesapce + "/" + key : key;
        return dec;
    };
}
exports.State = createVuexDecorator('computed', vuex_1.mapState);
exports.Mutation = createVuexDecorator('methods', vuex_1.mapMutations);
exports.Getter = createVuexDecorator('computed', vuex_1.mapGetters);
exports.Action = createVuexDecorator('methods', vuex_1.mapActions);
function namespace(n) {
    return {
        State: function (k) { return exports.State(k, n); },
        Mutation: function (k) { return exports.Mutation(k, n); },
        Getter: function (k) { return exports.Getter(k, n); },
        Action: function (k) { return exports.Action(k, n); },
    };
}
exports.namespace = namespace;
