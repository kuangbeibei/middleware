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
        port: 8899,
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
        proxy: {
            // '/api': {
            //     target: 'http://10.254.192.36:8080/', //curl "http://10.216.155.24:31380/v1/supplier?name=lys-yh&region=china-sh"
            //     pathRewrite: {'^/api' : ''},
            // },
            '/mid': 'http://10.254.192.52:8080',
            '/api-os.api.fz.yonghui.cn': {
                target: 'http://manager.dev.yonghui.cn',
                secure: true,
                changeOrigin: true,
                ws: true,
            }
        }
    },
    plugins: [
        new Webpack.ProgressPlugin(),
    ]
}