const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const dev = Boolean(process.env.WEBPACK_SERVE);
const config = require(`./config/${process.env.npm_config_config || 'default'}`);

const entries = glob.sync('./src/**/index.js');
glob('@(a|b).js',{matchBase:true},(err, files) => {
    console.log('sync', files);
    console.log(err);
});
console.log('1',entries);
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: "bundle.js"
    },
    plugins: [

    ]
};