/*
 * @Author: kuangdan 
 * @Date: 2019-10-29 16:34:41 
 * @Last Modified: 2019-10-29 16:34:41 
 */

const Webpack = require("webpack");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        host: '127.0.0.1',
        port: 8081,
        overlay: {
            errors: true
        },
        publicPath: "/",
        open: true,
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        watchOptions: {
            poll: true
        },
        proxy: [
            {
                context: ['/api-uum', '/api-mid'],
                // target: 'http://manager.dev.yonghui.cn/api-mid-deploy-redis.api.fz.yonghui.cn',
                target: 'http://manager.dev.yonghui.cn/',
                secure: true,
                changeOrigin: false,
                ws: true,
            },
        ]
    },
    plugins: [
        new Webpack.ProgressPlugin(),
    ]
}