const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
    entry: path.resolve(__dirname, "../src/main.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/.css$/,
                use: 
                    [
                        'style-loader',
                        'css-loader'
                    ]
            },
            {
                test: /.scss$/,
                use: 'sass-loader'
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                  name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }  
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            title: 'vueDemo'
        })
    ]
};