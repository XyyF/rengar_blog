---
title: Deep Copy
date: 2017-11-12 11:45:07
tags: javascript
---


# 深浅拷贝

对于前端的深浅拷贝问题，面试一直是热门的话题，在这里总结一下，希望有所帮助

本文解决问问题：
- 基本类型和引用类型
- 浅拷贝原理
- 深拷贝原理
- 一些浅/深拷贝的方法

<!-- more -->

## 何谓深拷贝、浅拷贝
浅拷贝：复制时，传递的只是地址，一个改变，另一个也会跟着改变
深拷贝：传递的是值，一个改变，另一个不改变
总之两个最根本的区别就是是否传递的是值

## 基本类型和引用类型
说到这儿，不得不说一下js里的变量类型
分为基本类型+引用类型
基本类型有number、string、boolean、null、undefined、es6的symbol
引用类型细分下有Array、Function、Object等

基本类型在栈内存中保存变量名 -> 值的
![img](baseType.png)

引用类型在堆内存中保存值的，然后再用栈内存保存键名 -> 地址的映射
![img](referenceType.png)
引用类型才会存在浅拷贝(栈内存保存的是映射关系，堆内存保存的是值)

基本类型的复制原理：
![img](baseCopy.png)

引用类型的复制原理：
![img](referenceCopy.png)

### 深拷贝
这里着重了解深拷贝的方法：
* 最基本的for循环赋值
* 递归方法
``` bash
const deepCopy = function(arr) {
    if (arr && typeof arr !== "Object") {
        return throw new Error(err, "error type")
    }
    let copyArr = Array.isArray(arr) ? [] : {}
    for (item in arr) {
        if (copyArr.hasOwnProperty(item)) {
            if (arr[item] && typeof arr[item] === "Object") {
                copyArr = deepCopy(arr[item])
            } else {
                copyArr = arr[item]
            }
        }
    }
    return copyArr
}
```

* Json方法
JSON.parse(JSON.stringify(arr))
* 数组的contact方法: arr.concat()
* 数组的slice方法: arr.slice(0)
* jquery的extend方法
* 对象的Object.assign()方法: Object.assign({}, obj1, obj2)


# 总结：
Array 的 slice 和 concat 方法 和 jQuery 中的 extend 复制方法，他们都会复制第一层的值，对于 第一层 的值都是 深拷贝，而到 第二层 的时候 Array 的 slice 和 concat 方法就是 复制引用 ，jQuery 中的 extend 复制方法 则 取决于 你的 第一个参数， 也就是是否进行递归复制。$.extend(true/false,....)

对象的Object.assign()是浅拷贝

最基本的for循环也是深拷贝

JSON.parse(JSON.stringify(test))是忽视原型链的深拷贝