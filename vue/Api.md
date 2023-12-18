## Vue Provie - Inject
React의 contextAPI와 같이 사용할 수 있다. 

## Writable_computed 
```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

## multiple Class Bind 
```vue

const activeClass = ref('active')
const errorClass = ref('text-danger')

<div :class="[activeClass, errorClass]"></div>
```

## v-model
modelValue + @input

##watch and watchEffect

```vue
const x = ref(0)
const y = ref(0)

// single ref
watch(() => x.value, (newX) => {
  console.log(`x is ${newX}`)
}, { deep: true, immediate: true })

watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})


```

> watch vs. watchEffect​
> 
> watch and watchEffect both allow us to reactively perform side effects. Their main difference is the way they track their reactive dependencies:
> 
> watch only tracks the explicitly watched source. It won't track anything accessed inside the callback. In addition, the callback only triggers when the source has actually changed. watch separates dependency tracking from the side effect, giving us more precise control over when the callback should fire.
> 
> watchEffect, on the other hand, combines dependency tracking and side effect into one phase. It automatically tracks every reactive property accessed during its synchronous execution. This is more convenient and typically results in terser code, but makes its reactive dependencies less explicit.


## ref
```vue

<template>
  <Child ref="child" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
})
</script>

```


## props 
```vue
// ❌ warning, props are readonly!
defineProps({
  title: String,
  likes: Number
})

//

<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>

```

### Binding Multiple Properties Using an Object
```vue

const post = {
  id: 1,
  title: 'My Journey with Vue'
}


<BlogPost v-bind="post" />
```

>
> Mutating Object / Array Props​
>
>When objects and arrays are passed as props, while the child component cannot mutate the prop binding, it will be able to mutate the object or array's nested properties. This is because in JavaScript objects and arrays >are passed by reference, and it is unreasonably expensive for Vue to prevent such mutations.
>
>The main drawback of such mutations is that it allows the child component to affect parent state in a way that isn't obvious to the parent component, potentially making it more difficult to reason about the data flow in >the future. As a best practice, you should avoid such mutations unless the parent and child are tightly coupled by design. In most cases, the child should emit an event to let the parent perform the mutation.
>

### valid Props 
```vue
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory 
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
})

```
