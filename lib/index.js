"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_1 = require("vuex");
var vue_class_component_1 = require("vue-class-component");
function createVuexDecorator(bindTo, mapper) {
    return function (key, namesapce) {
        var dec = vue_class_component_1.createDecorator(function (target, prop) {
            var _a;
            if (!target[bindTo]) {
                target[bindTo] = {};
            }
            var o = [(_a = {}, _a[prop] = key, _a)];
            if (namesapce)
                o.unshift(namesapce);
            target[bindTo][prop] = mapper.apply(target, o)[prop];
        });
        if (typeof (key) === 'string') {
            dec.key = namesapce ? namesapce + "/" + key : key;
        }
        return dec;
    };
}
var cvd = createVuexDecorator; // alias
exports.State = cvd('computed', vuex_1.mapState);
exports.Mutation = cvd('methods', vuex_1.mapMutations);
exports.Getter = cvd('computed', vuex_1.mapGetters);
exports.Action = cvd('methods', vuex_1.mapActions);
function namespace(n) {
    return {
        State: function (k) { return exports.State(k, n); },
        Mutation: function (k) { return exports.Mutation(k, n); },
        Getter: function (k) { return exports.Getter(k, n); },
        Action: function (k) { return exports.Action(k, n); },
    };
}
exports.namespace = namespace;
