---
title: 拥抱TypeScript
date: 2018-01-22 17:26:40
tags: TypeScript
---

# 拥抱TypeScript

本文解决的问题：
- TypeScript迁移到vue单页应用项目中

<!-- more -->

## JavaScript的超集

## TypeScript配置

### 1、webpack
安装ts-loader，这是提供给webpack的TypeScript编译器

npm install --save-dev ts-loader

然后在`module.rules`里添加支持
``` bash
{ 
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
        appendTsSuffixTo: [/\.vue$/]
    }
},
```
options里的选项是为了兼容*.vue文件

### 2、tsconfig.json
根目录下创建`tsconfig.json`文件和`package.json`同级,进行配置
``` bash
{
    "compilerOptions": {
        // 以严格模式解析
        "strict": true,
        // 采用的模块系统
        "module": "es6",
        // 如何处理模块
        "moduleResolution": "node",
        // 打包后的版本
        "target": "es5",
        "lib": ["dom", "es6"],
        "types": [ "node" ],
        // 启用 vue-class-component 及 vuex-class 需要开启此选项
        "experimentalDecorators": true
    }
}
```
然后修改项目下的`*.js`文件为`*.ts`文件

### 3、vue-shims.d.ts
TypeScript不能直接支持`*.vue`文件，所以这个文件就是告诉TypeScript`*.vue`文件交由vue编译器处理。最好放在webpack的entry的目录下的typeings文件中。

*.d.ts类型文件不需要手动引入，TypeScript会自动加载
``` bash
declare module "*.vue" {
    import Vue from 'vue';
    export default Vue
}
```

## 第三方插件库应用
Vue官方有提供一些对TypeScript的支持。

### Vue-Class-Component
这个插件是基于类的API来写vue和TypeScript，主体内容都是类的形式
``` bash
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    // 父组件props、components等内容
    props: {}
})
export default class App extends Vue {
    // data
    name:string = 'rengar'

    // computed
    get getName():string {
        return this.name
    }

    // methods
    outName():void {
        console.log(this.getName)
    }
    // 生命周期
    mounted() {
        this.outName();
    }
}
```
更多详情[vue-class-component](https://github.com/vuejs/vue-class-component)

### vuex-class
由于TypeScript对vuex的支持很不友好。故这个插件就是用来优化vuex的写法。
``` bash
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {
        State,
        Getter,
        Action,
        Mutation,
        namespace
    } from 'vuex-class'

    const ModuleGetter = namespace('path/to/module', Getter)

    @Component
    export class MyComp extends Vue {
        @State('foo') stateFoo: string
        @State(state => state.bar) stateBar: number
        @Getter('foo') getterFoo
        @Action('foo') actionFoo
        @Mutation('foo') mutationFoo
        @ModuleGetter('foo') moduleGetterFoo

        // If the argument is omitted, use the property name
        // for each state/getter/action/mutation type
        @State foo
        @Getter bar
        @Action baz
        @Mutation qux

        created () {
            this.stateFoo // -> store.state.foo
            this.stateBar // -> store.state.bar
            this.getterFoo // -> store.getters.foo
            this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
            this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
            this.moduleGetterFoo // -> store.getters['path/to/module/foo']
        }
    }
```
这样的写法看起来还不错
更多详情[vuex-class](https://github.com/ktsn/vuex-class)

### Vue-Property-Decorator
这是一个对vue-class-component进行了包装了的插件

提供了额外的7个装饰
- @Emit // methods
- @Inject
- @Model // model,定制v-model的prop和event
- @Prop // props
- @Provide
- @Watch // watch
- @Component (exported from vue-class-component) // 组件

``` bash
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

const s = Symbol('baz')

@Component
export class MyComponent extends Vue {

  @Emit()
  addToCount(n: number){ this.count += n }

  @Emit('reset')
  resetCount(){ this.count = 0 }

  @Inject() foo: string
  @Inject('bar') bar: string
  @Inject(s) baz: string

  @Model('change') checked: boolean

  @Prop()
  propA: number

  @Prop({ default: 'default value' })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }
}
```
上述代码翻译过来就是：
``` bash
const s = Symbol('baz')

export const MyComponent = Vue.extend({
  name: 'MyComponent',
  inject: {
    foo: 'foo',
    bar: 'bar',
    [s]: s
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    propA: Number,
    propB: {
      type: String,
      default: 'default value'
    },
    propC: [String, Boolean],
  },
  data () {
    return {
      foo: 'foo',
      baz: 'bar'
    }
  },
  provide () {
    return {
      foo: this.foo,
      bar: this.baz
    }
  },
  methods: {
    addToCount(n){
      this.count += n
      this.$emit("add-to-count", n)
    },
    resetCount(){
      this.count = 0
      this.$emit("reset")
    },
    onChildChanged(val, oldVal) { },
    onPersonChanged(val, oldVal) { }
  },
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    },
    'person': {
      handler: 'onPersonChanged',
      immediate: true,
      deep: true
    }
  }
})
```
更多详情[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)