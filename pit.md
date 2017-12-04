坑1：因为更新webpack至2.7.0的问题，请求部分静态资源的路径有误，正在排查
排查原因：
    webpack的Public路径为./的话，打包后，main.css引用静态资源的路径为./assets/....是相对文件路径的
    这是hexo打包后，html文件引用js、css文件的路径是/./main......是相对根目录路径的

    若是把Public的路径设置为/./的话，main.css引用静态资源的路径为/./assets/....是相对根目录路径的
    hexo打包后，html文件引用js、css文件的路径是//./main......找不到这个路径

    当前需要把hexo generate后的assets文件拷贝到每个文章目录下

    why??

解决：
    webpack打包后，图片资源的引用路径是output.publicPath + url-loader的options.name
    js资源路径是在htmlWebpackPlugin中的template的.ejs文件设置的，由于webpack1到webpack2的迁移原因
        之前的main.hash.js引入: 使用htmlWebpackPlugin.files.chunks
        有publicPath的话
        ## 访问路径相当于：config.root+output.Public+main.hash.js
        没有publicPath的话
        ## 访问路径相当于：config.root+layout/_partial/script.ejs文件相对到打包后的source的路径+main.hash.js <=> /../../source/main.hash.js
``` bash
<% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
<% if (chunk === 'main') { %>
<script src="<%= left %>config.root<%= right %><%= right2 %><%=htmlWebpackPlugin.files.chunks[chunk].entry %>"></script><% } %><% } %>
```
        先版本的main.hash.js引入: 使用compilation.assets
        ## 访问路径相当于：config.root+output.PublicPath+main.hash.js
        注意这里使用正则匹配mian.hash.js，因为main.css跟main.js同名
        slider可以直接使用asset2.indexOf('slider') >= 0
``` bash
 <script>
     (function() {
        var loadScript = function(path) {
            var $script = document.createElement('script')
            document.getElementsByTagName('body')[0].appendChild($script)
            script.setAttribute('src', path)
        }
        <% for (var asset1 in compilation.assets) { %><% if (/main\w*.js/gi.test(asset1) >= 0) { %><% var main = asset1 %><% } %><% } %>loadScript("<%= left %>config.root<%= right %><%= right2 %><%= main %>")
     })();
</script>
```
        原本main.js和slider.js的路径设置不同
        现在把main改为slider的版本
        main.css存在相同问题，但是未使用hash，写为固定路径
        npm run dev/dist后，在layout/partial/css.ejs或script.ejs会生成回应的模板，可以在里面查看路径

坑2: 未完全分离css文件，导致js文件关联了css文件，页面需要等到js文件加载完后，才会渲染css
    设置css 和 s[c|a]ss的use
    在plugin插件中，ExtractTextPlugin设置allChunks为true