const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './src/pages/index.js',
    output: {
        filename: '[name].[hash:5].js',
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin({filename: 'style.[hash:5].css'}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: { importLoaders: 1 }
                },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:5][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash:5][ext]'
                }
            },
        ]
    }
}