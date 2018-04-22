---
title: es6+node的导入/导出
date: 2017-11-10 18:34:27
tags: javascript
---

# exports + module.exports 和 export default + export 和 require

对于前端和node这些导入/导出区别，有时会经常搞混，现在我整理了一下，希望有所帮助

本文解决的问题：
- 各自的使用范围
- exports + module.exports的不同
- export default + export的不同
- 为什么require可以在node和es6都可以使用，并且有的地方会使用require('xx').default调用

<!-- more -->

## 适用范围(需要配置相应的babel)
es6和node都适用：require + import
node适用：exports + module.exports
es6适用：export + export default

所以这里着重说明两者的导出


## node的exports + module.exports
node模块在文件初始化的时候，会创建一个module对象和exports对象,大致关系如下：
``` bash
module.exports = exports = {}

//utils.js
let a = 100;
console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}
```
* 都指向同一块内存空间

``` bash
//utils
exports.a = 200;
console.log(module.exports) //能打印出结果为：{a : 200}
exports = '指向其他内存区'; //这里把exports的指向指走,exports =相当于给exports对象重新赋值

//test.js
var a = require('/utils');
console.log(a) // 打印为 {a : 200} exports导入后是一个对象，module可以导出函数
```
* 从上面可以看出，require导入的内容其实是module.exports指向的内存空间，并不是exports
* 简而言之，就是exports只是module.exports的引用，辅助后者向内存添加东西的（很苦逼）


* 当同时具备module.exports和exports时，以前者为主（有以下的原因）
* 当改变module.exports时，exports的指向不会改变，exports不再指向module.exports了
* 所以经常有以下的写法，恢复exports的活性
``` bash
exports = module.exports = { ... }
```

推荐统一使用module.exports，以免出错


## es6的export + export default
* export与export default均可用于导出常量、函数、文件、模块等
* export default 不能直接导出变量表达式
* 在一个文件中export、import可以有多个，但是export default只能有一个
* export导出，引入时需要加上{}标识；export default导出不用
``` bash
'use strict'
//test.js
//导出变量
export const a = '100';
 //导出方法
export const dogSay = function(){
    console.log('wang wang');
}
 //导出方法第二种
function catSay(){
   console.log('miao miao');
}
export { catSay };
const m = 100;
export default m;
//export defult const m = 100;// 这里不能写这种格式-不能直接导出表达式。


//index.js
'use strict'
import { dogSay, catSay } from './test'; //导入了 export 方法
import m from './testEs6Export';  //导入了 export default
import * as testModule from './test'; //as 集合成对象导入
  dogSay();
  catSay();
  console.log(m);
  testModule.dogSay();
  console.log(testModule.m); // undefined , 因为  as 导出是把零散的export聚集在一起作为一个对象，而export default是导出为 default属性。
  console.log(testModule.default); // 100
```
* 从上面可以看出export和export default是关联不大的两个导出方式

## 为什么require和import可以在es6和commonjs规范中使用
babel能够在打包前提前将es6的导出语法转化成commonjs规范，具体转化如下
``` bash
    es6导出模块：
    export default = 'abc'
    exporrt const a = 'a'
    export {b: 4}
    
    babel转化后：
    exports.default = 'abc'
    exports.a = 'a'
    exports.b = 4
    exports.__esModule = true // 标记这个是由es6转化为commonjs输出
    等价于
    exports.module = {
        default: 'abc',
        a: 'a',
        b: 4,
        __esModule: true,
    }
```

babel也能够在打包前提前将es6的导入语法转化成commonjs规范，具体转化如下
``` bash
    es6导入模块：
    import a from './a.js' // 导入export default模块
    import { a } from './a.js' // 导入export下的模块
    import * as a from './a.js' // 导入所有没款
    
    babel转化后：
    var a = require('./a.js').default // 引入export default模块
    var a = require('./a.js').a
    var a = require('./a.js')
```
这样require('xx')导入的为对象{default: 'abc', a: 'a', b: 4,...}
这里也就解释了为什么有的地方会require('xx').default调用

在commonjs规范中的require:
``` bash
    babel转化过程：
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        }
        else {
            var newObj = {}; // (A)
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                        newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    如果是es6模块，直接返回obj,若是commonjs模块，需要添加一个default,并把整个对象赋值个default
    所以es6中import a from './a.js'导入commonjs模块，即导入的是module.exports的值
```
所以import和require在es6和commonjs规范中可以互用