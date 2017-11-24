---
title: this到底指向哪儿
date: 2017-11-03 09:44:51
tags: javascript
---
## 1.前言
javascript对大多数人算是一门比较亲近的语言，但是要精通它，就要搞懂一些关键的问题，比如this对象到底指向谁，
经常傻傻分不清，现在好好总结一下

<!-- more -->

### this决策树
![img](this.png)

实例1：
``` bash
$ function test(name) {
    this.name = name
  }
  const obj = new test("XyyF")
  console.log(obj.name) // XyyF
```

上述代码判断过程：
    · this包装的test函数，由new调用?，是，所以this指向新建的对象obj

实例2：
``` bash
$ const testWrap = {
    name: "",
    test: function (name) {
        this.name = name
    }
  }
  const obj = testWrap.test("XyyF")
  console.log(testWrap.name) // XyyF
  console.log(obj) // undefined
```

上述代码判断过程：
    · this包装的test函数，由new调用?，否，继续
    · test函数是由dot(.)调用?，是，所以this对象指向dot(.)前的对象，即testWrap

实例3：
``` bash
$ const testWrap = {
      name: "",
      test: function (name) {
          function testIn(name) {
            this.name = name
          }
          testIn(name)
      }
    }
  const obj = testWrap.test("XyyF")
  console.log(testWrap.name) // ""
  console.log(obj) // undefined
  console.log(window.name) // XyyF
```

上述代码判断过程：
    · this包装的testIn函数，由new调用?，否，继续
    · testIn函数由dot(.)调用?，否，继续
    · 最终，this是指向window对象

引用一段话：
> JavaScript 中的函数既可以被当作普通函数执行，也可以作为对象的方法执行，这是导致 this 含义如此丰富的主要原因。一个函数被执行时，会创建一个执行环境（ExecutionContext），函数的所有的行为均发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments变量，其中包含调用函数时传入的参数。接下来创建作用域链。然后初始化变量，首先初始化函数的形参表，值为 arguments变量中对应的值，如果 arguments变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ExecutionContext）创建成功后，函数执行时才会执行，这点对于我们理解 JavaScript 中的变量作用域非常重要，鉴于篇幅，我们先不在这里讨论这个话题。最后为 this变量赋值，如前所述，会根据函数调用方式的不同，赋给 this全局对象，当前对象等。至此函数的执行环境（ExecutionContext）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ExecutionContext）中读取

理解这段话对于理解Javascript函数将大有好处。