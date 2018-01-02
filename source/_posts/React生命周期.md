---
title: React生命周期
date: 2018-01-02 09:38:04
tags: react
---
## 1.前言
这段时间，看了一下React，在感觉很强大，很适合组件开发，想在这里就生命周期对比下vue

本文解决问题：
- react生命周期
- 对比vue的生命周期

<!-- more -->

### React生命周期
如图：
[!img](react_1.png)
有如下4种情况：
- 第一次加载(如ctrl+F4)：
``` bash
    constructor() // 加载构造函数
    componentWillMount() // 挂载钩子
    render() // 渲染
    componentDidMount() // 挂载完成
    componentWillUnmount() // 取消挂载
```
- 父组件更新
``` bash
    componentWillReceiveProps()
    componentShouldUpdate()
    componentWillUpdate()
    render()
    componentDidUpdate()
```
- 子组件setState()更新
``` bash
    componentShouldUpdate()
    componentWillUpdate()
    render()
    componentDidUpdate()
```
- 强制更新forceUpdate()
``` bash
   componentWillUpdate()
   render()
   componentDidUpdate()
```
总结：无论哪种情况，都会进行render()渲染DOM，而第一次进入是Mount，其他情况是Update。

优势：知道了这些生命周期流程后，面对某些情况就可以很好的打上debugger断点调试了。

### Vue的生命周期
这里就只放一下命名了
``` bash
    beforeCreate()
    created()
    beforeMount()
    mounted()
    beforeUpdate()
    updated()
    beforeDestroy()
    destroyed()
```
光看Vue的生命周期命名的话，通过上面React的流程，就可以大概分析出Vue的生命周期流程;使用destroyed()代替了UnMount();简化了流程，没有强制更新的钩子;

对比两者的话，感觉React更加细分一些(该说不愧是React吗)，

疑惑：
- Vue的mounted()中可以使用this.$nextTick()来使DOM加载完成后执行，那么React呢？