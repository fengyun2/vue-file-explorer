/*
 * @Author: fengyun2
 * @Date:   2016-06-03 13:44:17
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-07-03 21:21:38
 */

/**
 * 打包上线还有bug, 请先不要使用这个上线功能
 */

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');


var fs = require('fs'),
    buildPath = './build/';
(function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file) {
            var curPath = path + '/' + file;
            if (curPath.indexOf('static') < 0) {
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }
        });
    }
})(buildPath);

var index_file = path.resolve(__dirname, 'src/index.html');
fs.readFile(index_file, 'utf-8', function(err, data) {
    if (err) {
        console.log('error: ', err);
    } else {
        var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3');
        devhtml = devhtml.replace('<script type="text/javascript" src="/bundle.js"></script>', '');
        fs.writeFileSync(index_file, devhtml);
    }
});

var json = require('./package.json')

var version = json.version.split('.')
var v = (version.shift() + '.' + version.join('')).replace(/0+$/, "0")
var now = new Date()
var snow = now.getFullYear() + '-' + (now.getMonth() + 1) +
    '-' + now.getDate() + ':' + now.getHours()

var static_url = 'assets/';
module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'src/main')], // [1] 注意这里
        react: ['babel-polyfill', 'react', 'react-dom', 'react-router'],
        vue: ['babel-polyfill', 'vue', 'vue-router', 'vue-resource', 'vue-lazyload'],
        zepto: ['zepto']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: static_url + 'js/[name].[chunkhash:16].js',
        chunkFilename: static_url + 'js/[name].[chunkhash:16].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            loader: ExtractTextPlugin.extract('style', 'css?-convertValues!postcss')
        }, {
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loader: ExtractTextPlugin.extract('style', 'css?-convertValues!sass!postcss')
        }, {
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                plugins: ['transform-runtime'],
                compact: false
            }
        }, {
            test: /\.json$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'json'
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
            loader: 'url',
            query: {
                limit: 1,
                name: static_url + 'img/[name].[ext]?[hash]'
            }
        }, {
            test: /\.(html|tpl)$/,
            // include: path.resolve(__dirname, 'src'),
            loader: 'html'
        }]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style', 'css!sass!postcss'),
            sass: ExtractTextPlugin.extract('vue-style', 'css!sass!postcss'),
            js: 'babel',
            html: 'vue-html',
            extract: true
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
    resolve: {
        root: [],
        alias: {
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
            'zepto': path.resolve(__dirname, './src/static/js/zepto-1.1.6-min.js')
        },
        extensions: ['', '.js', '.vue', '.jsx', '.scss', '.css'],
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'zepto',
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        //压缩打包的文件
        new uglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']
        }),

        new HtmlWebpackPlugin({
            favicon: './src/static/img/favicon.ico',
            filename: './index.html',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
            'common',
            'common.js', // [2] 和上面配置的入口对应,
            'app',
            'app.js',
            'react',
            'react.js',
            'vue',
            'vue.js',
            'zepto',
            'zepto.js'
            ],
            // filename: 'common.js', // 导出的文件的名称
            minChunks: Infinity
        }),
        function() {
            return this.plugin('done', function(stats) {
                var content;
                content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2);
                console.log('版本是：' + JSON.stringify(stats.toJson().hash));
            });
        },
        new ExtractTextPlugin(static_url + 'css/[name].[chunkhash:16].css', { allChunks: true }),
        new webpack.BannerPlugin('built in ' + snow + ' version ' + v + ' by luyun\n')
    ]
};
