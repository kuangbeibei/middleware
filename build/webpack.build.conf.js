module.exports = {
    mode: "production",
    output: {
        publicPath: "/yhmw/"
    },
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
                    name: 'middleware.vendor.js',
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
            name: 'build.runtime.js'
        }
    }
};