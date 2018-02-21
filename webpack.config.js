global.Promise = require ('bluebird');

const webpack = require('webpack'); // Доступ к встроенным плагинам
const path = require('path');       //
const dist = path.resolve(__dirname, 'public');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName),
        new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        filename: 'index.html',
        template: './src/assets/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
       debug: true
     })
];


if (process.env.NODE_ENV === 'production') {
    plugins.push(
    new CleanWebpackPlugin([ 'assets/' ], {
        root: dist,
        verbose: true,
        dry: false
    })
    );
    // plugins.push(new webpack.optimize.DedupePlugin());
    // plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new UglifyJsPlugin());

}

const config = {
    // Точка входа
    entry: ['babel-polyfill', './src/index.js'],
    // debug: process.env.NODE_ENV !== 'production',
    resolve: {
        // root:               path.join(__dirname, 'src'),
        // modulesDirectories: ['node_modules'],
        extensions:         ['.js', '.jsx']
    },
    devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : false,

    plugins,

    // Собираемый бандл
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, dist)
    },

    // Модули
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }, 
            {
                test: /\.(scss|sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ["@babel/preset-env","@babel/preset-react"]
                }
            }
        }]
    },
    devServer: {
        compress: true,
        port: 9000,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },


};


module.exports = config;