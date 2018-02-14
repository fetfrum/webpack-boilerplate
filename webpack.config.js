const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dist = path.resolve(__dirname, 'public');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
        entry: './src/main.js',
        devtool: 'inline-source-map',
        plugins: [
            new UglifyJsPlugin(),
            new CleanWebpackPlugin([dist]),
            new HtmlWebpackPlugin({
                title: 'Hot Module Replacement',
                filename: 'index.html',
                template: './src/assets/index.html'
            })
        ],
        module: {
            rules: [{
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                }, 
                {
                    test: /\.(scss|sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                }]
            },
            output: {
                filename: 'js/bundle.js',
                path: path.resolve(__dirname, dist)
            },
            devServer: {
                compress: true,
                port: 9000
            }
        };