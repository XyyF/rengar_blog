18.5.19日志：对于项目中的z-index的管理，使用zIndex.scss文件统一管理。目前存在大多数的已有z-index的待修改；之后需求都使用该方式。
[zIndex.scss](https://github.com/XyyF/rengar_blog/blob/master/themes/rengar/source-src/css/zIndex.scss)

18.5.16日志：为每个文章添加目录跳转功能

18.4.22日志：使用gitment库，评论在issues中保存

18.1.6日志：修复tools组件配合v-clioutside指令产生的条件重置bug、修复container先加载出页面再加载animation的问题。

18.1.1日志：开发dialog组件、修复#container的class中的display-show对tools组件带来的bug

12.29日志：添加联系我方式

12.24日志：
引入vue的数据驱动机制，后打算使用强大的React，之后解决bug

引入common文件存放公共功能模块：util下为js功能实现；vue_plugins下为vue自定义指令实现；其余为枚举类型和其Map转换

引入v-clickoutside自定义指令。使用vue开发。

12.21日志：浏览了TypeScript，打算用ts重构部分代码、解决：PhotoSwipe插件close时因锚链接滚动条跳转问题

12.4日记录：之前用了一周的时间去了解一些自动构建的工具

    最后决定使用travis-ci自动构建的工具来帮助自己实现持续集成CI(continuous intergration)
    下面的步骤就可以简化为git push代码就行了
[travis-ci导航](https://travis-ci.org/)
