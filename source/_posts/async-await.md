---
title: Promise 和 async-await
date: 2018-01-03 09:14:18
tags: es7
---

# Promise 和 async-await

> es5的回调让我们痛苦,es6的promise带我们脱离苦海,es7的async-await带我们走向光明。

本文解决的问题：
- 什么是Promise
- async-await含义和使用
- javaScript是单线程的，是怎么实现异步编程的
- 我实际遇到过的问题

<!-- more -->

## Promise

javaScript是单线程工作，意味着不能同时进行多个脚本运作，而Promise就是一种异步编程解决方案。

Promise是一个构造函数，代表着一个异步操作的最终完成或者失败的对象，有resolve、reject、race、all等静态方法(类调用)；原型(对象调用)上有着then、catch、finally等可链式调用方法。

Promise的一些特性：
   - 立即执行：创建Promise对象时，new Promise()内的代码块是立即执行的；
   - 不可中断：Promise一旦创建,除非其状态改变，否则无法中止；
   - 状态不可逆：Promise有着pending、resolve、reject三种状态，其状态一旦改变就无法再次改变。

## async-await含义和使用

async-await其实是es6的promise和generator的语法糖。

- async:

用于函数前,表示该函数是一个异步函数(但其实里面的内容也是立即执行的，这一点跟Promise的立即执行特性一样);

函数返回一个promise的最终状态,所以外部函数可以链式调用then、catch、finally等;,
返回值问题：
- 若return Promise.resolve()，直接输出
- 若return 直接变量，会对其进行Promise.resolve()处理
- 若没有return，默认调用Promise.resolve(undefined)

错误处理：内部发现错误，使用reject()抛出new Error()错误,外部函数使用catch捕获错误。
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

await后可以跟任何的表达式,但是主要功能还是跟promise对象表示异步等待操作;
若跟了一个普通的表达式,那么就直接执行下去，不会等待;
若跟一个promise对象,那么就要等待promise对象状态改变,并且接受返回的值,才会继续执行下去。
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

## javaScript是单线程的，是怎么实现异步编程的
javaScript引擎的Event Loop分为同步队列macro task和异步队列micro task顺序执行。
![img](task.png)
在第一个Event Loop即js的执行阶段中，产生macro task和micro task；在下个Event Loop中，优先执行同步队列macro task（执行过程中可能会产生新的macro task，则放入下一个Event Loop的macro task中），然后再执行异步队列micro task，如此实现异步编程。

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