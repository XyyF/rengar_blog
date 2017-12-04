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
theme/yilia 目录下配置UI开发，请阅读相关README
hexo generate后有个public目录，存放本地开发和提交git的文件

pit.md 文件下记录了一些遇到的坑，希望有所帮助

12.4日记录：之前用了一周的时间去了解一些自动构建的工具
[travis-ci导航](https://travis-ci.org/)
    
    最后决定使用travis-ci自动构建的工具来帮助自己实现持续集成CI(continuous intergration)


