---
title: async-await
date: 2018-01-03 09:14:18
tags: es7
---

# async-await

> es5的回调让我们痛苦,es6的promise带我们脱离苦海,es7的async-await带我们走向光明。

本文解决的问题：
- async-await含义和使用
- promise会被代替吗
- 我实际遇到过的问题

<!-- more -->

## async-await含义和使用

async-await其实是es6的promise和generator的语法糖。

- async:

用于函数前,表示该函数是一个异步函数;

函数返回一个promise,所以函数内部接受resolve(),可以链式调用then;

若没有resolve,可以接受return代表resolve(async才有的特性)。
``` bash
function async demo() {
    console.log(Math.random())
    return '123'  // 相当于resolve('123')
}
demo().then(value => { console.log(value) })
控制台输出：
    1.23131
    123
```

- await:

这是async wait的缩写,表示异步等待操作,所以await只能用于async的函数中;

await后可以跟任何的表达式,但是主要还是跟promise对象表示异步等待操作;若跟了一个普通的表达式,那么就直接执行下去;若跟一个promise对象,那么就要等待promise对象状态resolve完成,并且接受返回的resolve值,才会继续执行下去。
``` bash
function async demo() {
    const aw = await Math.random()
    return aw
}
function async demo1() {
    const aw = await new Promise((resolve) => {
        console.log('promise inside')
        resolve('resolve')
    })
    return aw
}
demo().then(value => { console.log('demo', value) })
demo1().then(value => { console.log('demo1', value) })
控制台输出：
    demo, 1.2321
    promise inside
    demo1, resolve
```

## async-await会代替promise吗
这个新上手的人可能会觉得async-await简直是神器,然后到处都在使用,然后写出一些bug
``` bash
假设这里demo开头的函数都返回peomise
function async demo1() {
    await demo1()
    await demo2()
    await demo3()
    return '123'
}
这个函数在demo1、2、3执行条件关联的情况(即后面的执行需要前面的结果)场景下,是没问题的。
但是若是在demo1、2、3z执行条件没有关联下,即并发执行,这样肯定是不合适的。
function async demo1() {
    const dm1 = demo1()
    const dm2 = demo2()
    const dm3 = demo3()
    Promise.all([dm1, dm2, dm3])
    return '123'
}
所以async-await有它的优点，但也不是能完全的代替promise
```

## 我实际遇到过的问题
await在for循环中的问题,所以再次说一句,await必须执行在async函数的上下文环境中,直接上代码了
``` bash
function async demo1() {
    Array.prototype.map.call(array, (arr) => {
        await arr.promiseFun()
        return '错误'
    })
}
```