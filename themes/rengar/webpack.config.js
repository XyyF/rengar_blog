const webpack = require("webpack");
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 模板压缩
// 详见：https://github.com/kangax/html-minifier#options-quick-reference
function resolve(dir) {
    return path.join(__dirname, dir)
}

let minifyHTML = {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyJS: true
}

module.exports = {
    entry: {
        main: "./source-src/js/main.js",
        slider: "./source-src/js/slider.js",
        mobile: ["babel-polyfill", "./source-src/js/mobile.js"],
    },
    output: {
        path: path.resolve('./source'),
        filename: "[name]_[chunkhash:8].js",
        chunkFilename: `[name]_[id]_[chunkhash:8].js`,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                cacheDirectory: true
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.s[c|a]ss$/,
            // loader: 'style-loader!css-loader!sass-loader',
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.css$/,
            // loader: 'style-loader!css-loader',
            use: ExtractTextWebpackPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {limit: 500, name: '/assets/[name]_[hash:6].[ext]'}
        }, {
            test: /\.(woff2?|eot|ttf|otf)$/,
            loader: 'url-loader',
            options: {limit: 8192, name: '/assets/[name]_[hash:6].[ext]'}
        },]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'utils': resolve('common/utils'),
            'common': resolve('common'),
        }
    },
    plugins: [
        // 把css抽取出来，可以在html中优先加载
        new ExtractTextWebpackPlugin({
            filename: 'main.css',
            allChunks: true,
        }),
        // 抽离公共组件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2,
        }),
        // 命名默认变量
        new webpack.DefinePlugin({
            'process.env': {
                // vue.js在正式环境不显示错误提示
                NODE_ENV: '"production"',
            }
        }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: minifyHTML,
            template: './source-src/script.ejs', // 相对当前目录的
            filename: '../layout/_partial/script.ejs', // 是相对生成目录source的
        }),
        new HtmlWebpackPlugin({
            inject: false,
            cache: false,
            minify: minifyHTML,
            template: './source-src/css.ejs',
            filename: '../layout/_partial/css.ejs'
        }),
        // webpack1迁移至webpack2兼容
        new webpack.LoaderOptionsPlugin({
            // 是否压缩css，并删除css中的注释，注意开启后会导致px2rem中的例外标志失效
            minimize: true, // loader是否切换到优化模式
            debug: false, // loader 是否为 debug 模式。debug 在 webpack 3 中将被移除。
        }),
        // 删除旧文件
        new CleanWebpackPlugin(['./source/main_*.js',
            './source/main.css',
            './source/common.js',
            './source/slider_*.js',
            './mobile_*.js'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        // 替换全局变量Vue，解决引入顺序导致有时提示Vue不存在的问题
        new webpack.ProvidePlugin({
            Vue: 'vue',
        }),
    ],
    watch: true
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        // 定义全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false // 警告false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
    ])
}
