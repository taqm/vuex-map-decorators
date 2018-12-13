[![npm version](https://badge.fury.io/js/vuex-map-decorators.svg)](https://badge.fury.io/js/vuex-map-decorators)

# vuex-map-decorators

# Dependency
- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)
- [vue-class-component](https://github.com/vuejs/vue-class-component)

If you want detail, see package.json.

## Installation
```bash
# npm
npm install vuex-map-decorators

# yarn
yarn add vuex-map-decorators
```

## Usage

### TypeSafed Decorator
```typescript
import { State } from 'vuex-map-decorators';

interface SampleState {
  count: any;
}

@Component
class Sample extends Vue {
  @State<SampleState>('count')
  count: any;

  // unkown property
  @State<SampleState>('message') // <- Error
  message: any;
}

```

#### defined decorator types

```typescript
@State<Type>(key: stirng, namespace?: string);
@Mutation<Type>(key: stirng, namespace?: string);
@Getter<Type>(key: stirng, namespace?: string);
@Action<Type>(key: stirng, namespace?: string);
```

### Namespace Decorators

```typescript
import { namespace } from 'vuex-map-decorators';

interface SampleState {
  count: number;
}
const state: SampleState = {
  count: 0,
};

const mutations = {
  // ...
};

const getters = {
  // ...
}
const actions = {
  // ...
}

const ns = namespace<
  SampleState,
  typeof mutations,
  typeof getters,
  typeof action,
>('sample');

// @ns.State('count')
// ↓ same
// @State<SampleState>('count', 'sample')
```

If you have unimplemented member
```typescript
const ns = namespace<
  SampleState,
  never, // <- Attention!
  typeof getters,
  typeof action,
>('sample');

ns.Mutation // <- Error
```
Only predefined ones can be referenced.

## use custom mapping

You can give mapping function to 'Decorator'.  
Of course it is type safety!

### State

```ts
interface State {
  user: {
    name: string;
    age: number;
  };
}
const ns = namespace<State>('sample');

@ns.State(state => state.user.name)
userName!: string;
```

### Mutation

```ts
// Payload format interface
interface Mutations {
  setUserData: { name: string, age: number };
}

const ns = namespace<State, Mutations>('sample');

@ns.Mutation((commit, name, age) => {
  commit('setUser', { name, age });
})
setUserData!: (name: string, age: number) => void;
```

There is no need to worry about the payload format of Mutasion function

### Getter, Actions
sorry...  
Unsupported...


## use native vuex context
```typescript
const ns = namespace<...>('sample');

$store.commit(ns.Mutation('increment').key));
// ↓
$store.commit('sample/increment');
// -> sample/increment
```

## License
MIT
