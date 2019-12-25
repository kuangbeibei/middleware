/*
 * @Author: kuangdan
 * @Date: 2019-10-29 16:34:41
 * @Last Modified: 2019-10-29 16:34:41
 */

const Webpack = require("webpack");

module.exports = {
	mode: "development",
	// devtool: "inline-source-map",
	devServer: {
		contentBase: "../dist",
		host: "127.0.0.1",
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
      poll: 1000,
      ignored: /node_modules/
		},
		proxy: [
			{
				context: ["/api-uum", "/api-mid", "/api-mwp"],
				target: "http://manager.dev.yonghui.cn/",
				secure: true,
				changeOrigin: false,
				ws: true
			}
		]
	},
  plugins: [new Webpack.ProgressPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      // maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },    
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    },
  }
};
