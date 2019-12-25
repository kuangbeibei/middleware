/*
 * 基础配置
 * @Date: 2019-10-29 16:38:11
 * @Last Modified: 2019-10-29 16:38:11
 */

//node内置模块
const path = require("path");

// 第三方模块
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 自定义模块
const DevConfig = require("./webpack.dev.conf");
const BuildConfig = require("./webpack.build.conf");

const ResolvePath = dir => {
	return path.join(__dirname, dir);
};

const {
	env: { ENV }
} = process;
const isDevMode = ENV === "DEV";

module.exports = WebpackMerge(
	{
		entry: {
			index: ResolvePath("../src/index.tsx")
		},
		output: {
			filename: isDevMode
				? "middleware.[name].bundle.js"
				: "middleware.[name].[hash:5].bundle.js",
			path: ResolvePath("../dist"),
			chunkFilename: "middleware.[name].chunkfile.js",
			publicPath: "/"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
			alias: {
				"@pages": ResolvePath("../src/pages"),
				"@com": ResolvePath("../src/components"),
				"@router": ResolvePath("../src/router"),
				"@utils": ResolvePath("../src/utils"),
				"@api": ResolvePath("../src/utils/api"),
				"@tools": ResolvePath("../src/utils/tools"),
				"@actions": ResolvePath("../src/store/actions"),
				"@styled": ResolvePath("../src/styled-components"),
				"@hooks": ResolvePath("../src/hooks"),
				"@image": ResolvePath("../src/assets/image"),
				"@funcs": ResolvePath("../src/Funcs")
			}
		},
		module: {
			rules: [
				{
					test: /\.(le|c)ss$/,
					use: [
						isDevMode
							? "style-loader"
							: {
									loader: MiniCssExtractPlugin.loader,
									options: {
										hmr: isDevMode
									}
							  },
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
					test: /\.(png|jpg|jpeg|gif|svg)$/,
					loader: "file-loader",
					options: {
						publicPath: "/",
						name: "middleware.[name].[hash:5].[ext]"
					}
				},
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "ts-loader"
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: ResolvePath("../src/index.html"),
				filename: `index.html?tag=${new Date().getTime()}`
			}),
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: isDevMode ? "[name].css" : "[name].[hash].css",
				chunkFilename: isDevMode ? "[id].css" : "[id].[hash].css"
			})
		]
	},
	isDevMode ? DevConfig : BuildConfig
);
