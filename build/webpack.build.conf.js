const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const ResolvePath = dir => {
	return path.join(__dirname, dir);
};


module.exports = {
    mode: "production",
    devtool: "source-map",
    optimization: {
        minimize: true,
        namedModules: true,
        namedChunks: true,
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: "~",
            automaticNameMaxLength: 30,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendor',
                    enforce: true
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
        },
        runtimeChunk: {
            name: 'build.runtime'
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
};
