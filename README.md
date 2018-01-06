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

[详情请看](http://xyyf.club/2017/12/04/%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8travis-ci%E6%B5%8B%E8%AF%95/)

# rengar的博客备份

地址：xyyf.club

hexo配置说明：[hexo](https://hexo.io/zh-cn/docs/configuration.html)

开发：
### yarn

```
npm install yarn -g
```
没有npm的话可以直接去[这里](https://yarnpkg.com/en/docs/install)下载yarn安装包

yarn 安装依赖包

### 编译三步走：

    hexo clean // 清除旧文件
    
    hexo generate // 生成静态html代码
    
    hexo deploy // 发布到github
    
本地开发环境：hexo server

创建新文章：hexo new "名字"

修改README或者CNAME文件 -> 在source目录下修改

### 目录
source 目录下存放文章
theme/yilia 目录下配置UI/功能开发
hexo generate后有个public目录，存放本地开发和提交git的文件

pit.md 文件下记录了一些遇到的坑，希望有所帮助


