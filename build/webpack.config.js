/*
 * @Author: kuangdan
 * @Date: 2019-10-29 16:38:11
 * @Last Modified: 2019-10-29 16:38:11
 */

//node内置模块
const path = require("path");

// 第三方模块
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMerge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 自定义模块
const DevConfig = require("./webpack.dev.conf");
const BuildConfig = require("./webpack.build.conf");

const ResolvePath = dir => {
	return path.join(__dirname, dir);
};

const {
	env: { ENV }
} = process;

module.exports = WebpackMerge(
	{
		entry: {
			index: ResolvePath("../src/index.tsx")
		},
		output: {
			filename:
				ENV === "DEV"
					? "middleware.[name].bundle.js"
					: "middleware.[name].[hash:5].bundle.js",
			path: ResolvePath("../dist"),
			chunkFilename: "[name].chunkfile.js"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
			alias: {
				"@pages": ResolvePath("../src/pages"),
				"@com": ResolvePath("../src/components"),
				"@router": ResolvePath("../src/router"),
				"@utils":ResolvePath("../src/utils"),
				"@api": ResolvePath("../src/utils/api"),
				"@tools": ResolvePath("../src/utils/tools"),
				"@actions": ResolvePath("../src/store/actions"),
				"@styled": ResolvePath("../src/styled-components"),
				"@hooks": ResolvePath("../src/hooks"),
				"@image": ResolvePath("../src/assets/image")
			}
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.less$/,
					use: [
						"style-loader",
						"css-loader",
						{
							loader: "less-loader",
							options: {
								javascriptEnabled: true
							}
						}
					]
				},
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/
				},
				{
					test: /\.tsx?$/,
					enforce: "pre",
					use: "source-map-loader"
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						publicPath: "/",
					},
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: ResolvePath("../src/index.html"),
				filename: ENV === "DEV" ? "index.html" : "middleware.index.[hash:5].html"
			})
		]
	},
	ENV === "DEV" ? DevConfig : BuildConfig
);
