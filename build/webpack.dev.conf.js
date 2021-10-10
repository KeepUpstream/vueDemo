const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

console.log(process.env.NODE_ENV)

module.exports = {
    entry: path.resolve(__dirname, "../src/main.js"),
    devtool: "cheap-module-eval-source-map",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    mode: 'development',
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
            }  
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            title: 'vueDemo'
        })
    ],
    devServer: {
        port: 8085,
        host: '127.0.0.1',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8102',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        },
        hot:true
    }
};