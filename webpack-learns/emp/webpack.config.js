const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
// 使用WEBPACK_SERVE环境变量检测当前是否在webpack-server启动的环境内
const dev = Boolean(process.env.WEBPACK_SERVE);
console.log('环境变量', dev);
module.exports = {
    /*
    webpack 执行模式
    development：开发环境，它会在配置文件中插入调试相关的选项，比如 moduleId 使用文件路径方便调试
    production：生产环境，webpack 会将代码做压缩等优化
    */
    mode: dev ? 'development' : 'production',

    /*
    配置 source map
    开发模式下使用 cheap-module-eval-source-map, 生成的 source map 能和源码每行对应，方便打断点调试
    生产模式下使用 hidden-source-map, 生成独立的 source map 文件，并且不在 js 文件中插入 source map 路径，用于在 error report 工具中查看 （比如 Sentry)
    */
    devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

    // 配置页面入口 js 文件
    entry: './src/index.js',

    // 配置打包输出相关
    output: {
        // 打包输出目录
        path: resolve(__dirname, 'dist'),

        // 入口 js 的打包输出文件名
        filename: 'index.js'
    },

    module: {
        /*
        配置各种类型文件的加载器，称之为 loader
        webpack 当遇到 import ... 时，会调用这里配置的 loader 对引用的文件进行编译
        */
        rules: [
            {
                /*
                使用 babel 编译 ES6 / ES7 / ES8 为 ES5 代码
                使用正则表达式匹配后缀名为 .js 的文件
                */
                test: /\.js$/,

                // 排除 node_modules 目录下的文件，npm 安装的包不需要编译
                exclude: /node_modules/,

                /*
                use 指定该文件的 loader, 值可以是字符串或者数组。
                这里先使用 eslint-loader 处理，返回的结果交给 babel-loader 处理。loader 的处理顺序是从最后一个到第一个。
                eslint-loader 用来检查代码，如果有错误，编译的时候会报错。
                babel-loader 用来编译 js 文件。
                */
                use: ['babel-loader']
            },

            {
                // 匹配 html 文件
                test: /\.html$/,
                /*
                使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
                import htmlString from './template.html';
                template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
                */
                use: 'html-loader'
            },

            {
                // 匹配 css 文件
                test: /\.css$/,

                /*
                先使用 css-loader 处理，返回的结果交给 style-loader 处理。
                css-loader 将 css 内容存为 js 字符串，并且会把 background, @font-face 等引用的图片，
                字体文件交给指定的 loader 打包，类似上面的 html-loader, 用什么 loader 同样在 loaders 对象中定义，等会下面就会看到。
                */
                use: ['style-loader', 'css-loader']
            },

            {
                /*
                匹配各种格式的图片和字体文件
                上面 html-loader 会把 html 中 <img> 标签的图片解析出来，文件名匹配到这里的 test 的正则表达式，
                css-loader 引用的图片和字体同样会匹配到这里的 test 条件
                */
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

                /*
                使用 url-loader, 它接受一个 limit 参数，单位为字节(byte)

                当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
                当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径改写成输出后的路径

                比如 views/foo/index.html 中
                <img src="smallpic.png">
                会被编译成
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">

                而
                <img src="largepic.png">
                会被编译成
                <img src="/f78661bef717cf2cc2c2e5158f196384.png">
                */
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },

    /*
    配置 webpack 插件
    plugin 和 loader 的区别是，loader 是在 import 时根据不同的文件名，匹配不同的 loader 对这个文件做处理，
    而 plugin, 关注的不是文件的格式，而是在编译的各个阶段，会触发不同的事件，让你可以干预每个编译阶段。
    */
    plugins: [
        /*
        html-webpack-plugin 用来打包入口 html 文件
        entry 配置的入口是 js 文件，webpack 以 js 文件为入口，遇到 import, 用配置的 loader 加载引入文件
        但作为浏览器打开的入口 html, 是引用入口 js 的文件，它在整个编译过程的外面，
        所以，我们需要 html-webpack-plugin 来打包作为入口的 html 文件
        */
        new HtmlWebpackPlugin({
            /*
            template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
            webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
            html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
            可以通过 filename 参数指定输出的文件名
            html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
            */
            template: './src/index.html',

            /*
            因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
            https://github.com/jantimon/html-webpack-plugin/issues/870
            */
            chunksSortMode: 'none'
        })
    ]
};

/*
配置开发时用的服务器，让你可以用 http://127.0.0.1:8080/ 这样的 url 打开页面来调试
并且带有热更新的功能，打代码时保存一下文件，浏览器会自动刷新。比 nginx 方便很多
如果是修改 css, 甚至不需要刷新页面，直接生效。这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多。

因为 webpack-cli 无法正确识别 serve 选项，使用 webpack-cli 执行打包时会报错。
因此我们在这里判断一下，仅当使用 webpack-serve 时插入 serve 选项。
issue：https://github.com/webpack-contrib/webpack-serve/issues/19
*/
if (dev) {
    module.exports.serve = {
        // 配置监听端口，默认值 8080
        port: 8080,

        // add: 用来给服务器的 koa 实例注入 middleware 增加功能
        add: app => {
            /*
            配置 SPA 入口

            SPA 的入口是一个统一的 html 文件，比如
            http://localhost:8080/foo
            我们要返回给它
            http://localhost:8080/index.html
            这个文件
            */
            app.use(convert(history()))
        }
    }
}
/*
module.exports = {
    /!*
    * webpack执行模式
    * development: 开发环境，它会在配置文件中插入调试相关的选项，比如moduleId使用文件路径方便调试
    * production: 生产环境，webpack会将代码做压缩等优化。
    * *!/
    mode: dev ? 'development' : 'production',
    /!*
    *配置source map
    * 开发模式下使用cheap-module-eval-source-map,生成的source map能和源码每行对应，方便打断点调试
    * 生产模式下使用hidden-source-map,生成独立source map文件，并且不在js文件中插入source map路径，用于在error report 工具中查看（比如Sentry）
    * *!/
    devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    // 配置页面入口文件
    entry: './src/index.js',

    // 配置打包输出相关
    output: {
        // 打包输出目录
        path: resolve(__dirname,'dist'),
        // 入口js的打包输出文件名
        filename: "bundle.js"
    },

    module: {
        /!*
        * 配置各种类型文件的加载器，称之为loader
        * webpack 当遇到import时，会调用这里配置的loader对引用的文件进行编译
        * loader的处理顺序是从最后一个到第一个
        * *!/
        rules: [
            {
                /!*
                * 使用babel编译ES6/ES7/ES8为ES5代码
                * 使用正则表达式匹配后缀名为.js文件
                * *!/
                test: /\.js$/,
                // 排除node_modules目录下的文件，npm安装的包不需要编译
                exclude: /node_modules/,

                /!*
                * use指顶该文件的loader，值可以是字符串或者数组
                *
                * *!/

                use: ['babel-loader']
            },
           /!* {
                // 匹配html文件
                test: /\.html$/,
                /!*
                * 使用html-loader,将html内容存为js字符串，比如当遇到import htmlString from './template.html';
                * template.html的文件内容会被转成一个JS字符串，合并到js文件。
                * *!/
                use: 'html-loader'
            },*!/
            {
                // 匹配css文件
                test: /\.css$/,
                /!*
                * 先使用css-loader处理，返回的结果交给style-loader处理
                * css-loader 将css内容存为js字符串，并且会把background，@font-face等引用的图片，字体文件交给指定的loader打包，
                * *!/
                use: ['style-loader','css-loader']
            },
            {
                // 匹配 html 文件
                test: /\.html$/,
                /!*
                使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
                import htmlString from './template.html';
                template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
                *!/
                use: ['html-loader']
            },

            {
                // 匹配各种格式的图片和字体文件
                /!*
                * 上面html-loader 会把html中<img>标签的图片解析出来，文件名匹配到这里的test的正则表达式，
                * css-loader 引用的图片和字体同样会匹配到这里的test条件
                *
                * *!/
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                /!*
                * 使用url-loader,它接受一个limit参数，单位为字节（byte）
                *
                * 当文件体积小于limit时，url-loader把文件转为Data URI格式内联到引用的地方
                * 当文件大于limit时，url-loader会调用file-loader,把文件储存到输出目录，并把引用的文件路径改写成输出后的路径
                * 比如views/foo/index.html中
                * <img src="smallpic.png">
                * 会被编译成
                * <img src = "data:image/png;base64,">
                * 而
                * <img src = "largepic.png">
                * 会被编译成
                * <img src = "/f78661bef717cf2cc2c2e5158f196384.png" >
                * *!/
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },

    /!*
    *配置webpack插件
    * plugin和loader的区别是，loader是在import时根据不同的文件名，匹配不同的loader对这个文件做处理，
    * 而plugin，关注的不是文件的格式，而是在编译的各个阶段，会触发不同的事件，让你可以干预每个编译阶段。
    *
    * *!/

    plugins: [
        /!*
        * html-webpack-plugin 用来打包入口html文件
        * entry配置的入口是js文件，webpack以js文件为入口，遇到import，用配置的loader加载引入文件但作为浏览器的入口html,是引用入口js的文件，它在整个编译过程的外面。
        *所以，我们需要html-webpack-plugin来打包作为入口的html文件
        * *!/

        new HtmlWebpackPlugin({
            /!*
            * template 参数指定入口html文件路径，插件会把这个文件交给webpack去编译
            * webpack按照正常的流程，找到loaders中test条件匹配的loader来编译，那么这里html-loader就是匹配的loader html-loader编译后产生的字符串，会由html-webpack-plugin存储为html文件到输出目录，默认文件名为index.html
            * 可以通过filename参数指定输出的文件名
            *html-webpack-plugin 也可以不指定template参数，它会使用默认的html模板
            * *!/
            // template: 'bar.html',
            template: resolve(__dirname,'src','index.html'),
            filename:'index.html',
            /!*
            *因为webpack4的兼容问题，chunkSortMode参数设置为none
            * https://github.com/jantimon/html-webpack-plugin/issues/870
            * *!/
            chunksSortMode: 'none'
        })
    ]
};
/!*
        * 配置开发时用的服务器，让你可以用htt://127.0.0.1:8080/这样的url打开页面来调试
        *
        * 并且带有热更新的功能，打代码时保存一下文件，浏览器会自动刷新。比nginx方便很多
        *如果是修改css，甚至不需要刷新页面，直接生效。这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多
        *
        * 因为webpack-cli无法正确识别serve选项，使用webpack-cli执行打包时会报错。
        * 因此我们在这里判断一下，仅当使用webpack-serve时插入serve选项。
        * issue：https://github.com/webpack-contrib/webpack-serve/issues/19
        * *!/
if(dev) {
    module.exports.serve = {
        // 配置监听端口，默认值8080
        port: 8080,
        // add: 用来给服务器koa实例注入 middleware增加功能
        add: app => {
            /!*
            * 配置SPA入口
            *
            * SPA的入口是一个统一的html文件，比如
            * http://localhost:8080/foo
            * 我们要返回给它
            * http://localhost:8080/index.html这个文件
            * *!/
            app.use(convert(history()))
        }
    }
}*/
