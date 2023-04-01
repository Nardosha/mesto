const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './scripts/index.js',
    output: {
        filename: '[name].[hash:5].js',
        path: path.join(__dirname, '/build'),
        clean: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build')
        },
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new MiniCssExtractPlugin({filename: 'style.[hash:5].css'}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:5][ext]'
                }
            }
        ]
    }

}