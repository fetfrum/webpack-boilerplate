const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/build"
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]

    },
    plugins: [new UglifyJsPlugin()],
    devServer: {
        compress: true,
        port: 9000,
        contentBase: [
            "public"
        ],
        open: true,
        hot: true,
    },
};