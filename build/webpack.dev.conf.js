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
        headers: {
            'yh-manager-session': 's%3ANf0lfE1gZH8IddkCVR317rJJ5rZHTQbs.bghjTbWyTEXSnKcbdl62HPzPpgAH9Jfx9yXcEKLj74Y',
            'crowd.token_key': 'wr50l9OwgjoD0ttL10s4yQ00'
        },
        proxy: [
            {
                context: ['/mid'],
                target: 'http://manager.dev.yonghui.cn/api-mid-deploy-redis.api.fz.yonghui.cn',
            },
            {
                context: ['/admin'],
                // target: 'http://manager.qa.yonghui.cn',
                //   target: 'http://manager.tce.cloud.yonghui.cn',  //准生产
                target: 'http://manager.dev.yonghui.cn/api-os.api.fz.yonghui.cn',
                secure: true,
                changeOrigin: false,
                ws: true,
            }
        ]
    },
    plugins: [
        new Webpack.ProgressPlugin(),
    ]
}