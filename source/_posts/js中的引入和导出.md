---
title: es6+node的导入/导出
date: 2017-11-10 18:34:27
tags: javascript
---

# exports + module.exports 和 export default + export 和 require

对于前端和node这些导入/导出区别，有时会经常搞混，现在我整理了一下，希望有所帮助

<!-- more -->
## 适用范围
es6和node都适用：require
node适用：exports + module.exports
es6适用：export + export default

所以这里着重说明两者的导出


### exports + module.exports
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


### export + export default
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