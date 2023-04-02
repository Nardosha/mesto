const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool:  'source-map',
    entry: './scripts/index.js',
    output: {
        filename: '[name].[hash:5].js', // название файла с уникальным хэшом
        path: path.join(__dirname, 'build'), // складываем "filename" в папку build
        clean: true // удалять старые файлы пееред новым билдом
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build')
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}), // HTML плагин с указанием адреса html шаблона
        new MiniCssExtractPlugin({filename: 'style.[hash:5].css'}), // CSS плагин с конфигом названия файла
    ],
    module: {
        rules: [
            { // правило для babel-loader:
                test: /\.js$/, // для всех файлов с расширением .js
                exclude: /node_modules/, // кроме папки node_modules
                use: { // использовать
                    loader: 'babel-loader', //babel-loader
                    options: { // с опциями:
                        presets: [ // пресет
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },
            {//правило для css:
                test: /\.css$/i, // для всех файлов с расширением .css
                use: [MiniCssExtractPlugin.loader, { // использовать
                    loader: 'css-loader', // лоадер - css-loader
                    options: { // с опциями:
                        importLoaders: 1 // также использовать еще 1 лоадер (postcss-loader)
                    }
                }, 'postcss-loader'] //лоадер- css-loader
            },
            {//правило для assets:
                test: /\.(png|jpg|svg)$/, // для всех файлов с расширением .png и .jpg
                type: 'asset/resource', // лоадер - asset/resource
                generator: {
                    filename: 'img/[name].[hash:5][ext]' // положить все картинки в папку img с названием [name] и хэшом и расширением [ext]
                }
            },
            {// правило для шрифтов
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash:5][ext]' // положить все шрифты в папку fonts с названием [name] и хэшом и расширением [ext]
                }
            },
        ]
    }

}