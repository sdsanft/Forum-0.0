// Import dependencies
const path = require('path');
// Handles css files
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
// Spits out an index.html file in the build
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Configure webpack
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            // For .js or .jsx files use babel-loader. Exclude node modules
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        // Take the index.html file as a template and create a new one in the build folder
        new HtmlWebPackPlugin({
            template: "./templates/index.html",
            filename: "./index.html"
        }), new ExtractTextPlugin({filename: "style.css"})
    ]
};