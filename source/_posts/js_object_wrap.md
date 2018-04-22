---
title: js对象的封装实现
date: 2018-01-07 15:51:39
tags: 原型链
---

本文主要是为了更好的理解原型链

本文解决问题：
- 对象的封装
- new关键字的模拟实现

<!-- more -->

## 常见的封装
``` bash
function Point(name) {
    this.name = name
}
Point.prototype = {
    constructor: Point,
    getName: function() {
        return this.name    
    }
}
```
- 可以看出Point.prototype是包含了constructor的

## 进一步封装：
``` bash
function Point(name) {
    this.init(name)
}
Point.prototype = {
    constructor: Point,
    getName: function() {
        return this.name    
    },
    init: function(name) {
        this.name = name
    }
}
```

## new的执行原理

下面是模拟new的实现
``` bash
function(constructor, args) {
    var obj = {}
    obj.prototype = constructor.prototype
    const res = constructor.apply(obj, args)
    const types = ['string', 'number', 'boolean', 'null', 'undefined']
    const type = typeof res
    if (types.indexOf(type) !== -1) {
        return obj
    }
    return res
}
```
- 创造一个新的对象,正常返回也是这个新的对象
- 把constructor以obj为this调用,obj就有了constructor中的属性
- 若是constructor中有返回值(如复合类型),会直接返回复合类型,做特殊判断