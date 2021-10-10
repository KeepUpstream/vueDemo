const path = require('path');


module.exports = {
    entry: path.resolve(__dirname, "../src/main.js"),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [{
            test: /.vue$/,
            loader: 'vue-loader'
        }]
    }
}