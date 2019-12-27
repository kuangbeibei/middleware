/*
 * 开发配置
 * @Date: 2019-10-29 16:34:41
 * @Last Modified: 2019-10-29 16:34:41
 */

const Webpack = require("webpack");
module.exports = {
	mode: "development",
	devServer: {
		contentBase: "../dist",
		host: "127.0.0.1",
		port: 8081,
		overlay: {
			errors: true
		},
		publicPath: "/",
		open: true,
		// inline: true,
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: false, // true for self-signed, object for cert authority
		noInfo: true, // only errors & warns on hot reload
		watchOptions: {
			poll: 1000,
			ignored: /node_modules/
		},
		proxy: [
			{
				context: ["/api-uum", "/api-mid", "/api-mwp", "/api/user/login"],
				target: "http://manager.dev.yonghui.cn/",
				secure: true,
				changeOrigin: false,
				ws: true
			}
		],
	},
  plugins: [
    new Webpack.ProgressPlugin(),
    new Webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.ENV)
    })
  ]
};
