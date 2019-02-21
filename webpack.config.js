const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap']
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
        // hot: true
    },
    devtool: 'source-map'
};