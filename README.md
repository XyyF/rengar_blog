[文章列表](https://github.com/XyyF/rengar_blog/blob/master/article.md)

[开发日志](https://github.com/XyyF/rengar_blog/blob/master/devlog.md)

[项目地址](http://xyfui.club)

# rengar的博客备份

[hexo配置说明](https://hexo.io/zh-cn/docs/configuration.html)

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
pit.md 开发时遇到的问题
article.md 文章列表
devlog.md 开发日志
source 目录下存放文章
theme/rengar 目录下配置UI/功能开发
hexo generate后有个public目录，存放本地开发和提交git的文件


