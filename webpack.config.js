const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

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
        }]
    },
    plugins: [
        // Take the index.html file as a template and create a new one in the build folder
        new HtmlWebPackPlugin({
          template: "./templates/index.html",
          filename: "./index.html"
        })
      ]
};