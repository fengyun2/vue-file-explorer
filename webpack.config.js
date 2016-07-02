let path = require('path');
let webpack = require('webpack');
let fs = require('fs');
let precss = require('precss');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');
let autoprefixer = require('autoprefixer');
let combineLoaders = require('webpack-combine-loaders');

// 运行准备阶段
var index_file = path.resolve(__dirname, 'src/index.html');
fs.readFile(index_file, 'utf-8', function(err, data) {
    if (err) {
        console.log('error: ', err);
    } else {
        var devhtml = data;
        if (data.indexOf('/bundle.js') < 0) {
            devhtml = devhtml.replace('</body>', '<script type="text/javascript" src="/bundle.js"></script></body>');
        }
        fs.writeFileSync(index_file, devhtml);
    }
});


let static_url = 'assets/';
module.exports = {
    debug: true,
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, './src/main')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: './bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
        function() {
            return this.plugin('done', function(stats) {
                var content;
                content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2);
                console.log('版本是：' + JSON.stringify(stats.toJson().hash));
            });
        },
    ],
    module: {
        loaders: [{
            test: /\.vue$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'vue'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style!css!sass!postcss'
        }, {
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: combineLoaders([{
                loader: 'react-hot!babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            }])
        }, {
            test: /\.json$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'json'
        }, {
            test: /\.json$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'json'
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
            loader: 'url',
            query: {
                limit: 1,
                name: static_url + 'img/[name].[hash:7].[ext]?[hash]'
            }
        }, {
            test: /\.(html|tpl)$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'html'
        }]
    },
    externals: {
        'zepto': 'Zepto',
        'wx': 'jWeixin'
    },
    vue: {
        loaders: {
            css: 'vue-style!css!sass!postcss?sourceMap',
            sass: 'vue-style!css!sass!postcss?sourceMap',
            js: 'babel',
            query: {
                presets: ['es2015', 'stage-0'],
                plugins: ['transform-runtime']
            },
            html: 'vue-html'
        }
    },
    postcss: [
        precss,
        autoprefixer({
            flexbox: true,
            browsers: ['> 0.1%'],
            cascade: false,
            supports: true
        })
    ],
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
        extensions: ['', '.js', '.vue', '.jsx', '.scss', '.css'],
        alias: {}
    },
};
