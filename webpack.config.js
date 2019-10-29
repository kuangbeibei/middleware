/*
 * @Author: kuangdan 
 * @Date: 2019-10-29 16:38:11 
 * @Last Modified: 2019-10-29 16:38:11 
 */ 

//node内置模块
const path = require('path');

// 第三方模块
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMerge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// 自定义模块
const DevConfig = require("./webpack.dev.conf");
const BuildConfig = require("./webpack.build.conf");


const ResolvePath = (dir) => {
    return path.resolve(__dirname, dir)
}

const {
    env: {
        ENV
    }
} = process;


module.exports = WebpackMerge({
    entry: {
        index: './src/index.tsx'
    },
    output: {
        filename: ENV === 'DEV' ? '[name].bundle.js' : '[name].[hash:5].bundle.js',
        path: ResolvePath('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: ['source-map-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        })
    ]
}, ENV === 'DEV' ? DevConfig : BuildConfig)