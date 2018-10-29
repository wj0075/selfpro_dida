const path = require('path');
const webpack  = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
console.log(process);
module.exports = {
    // mode: process.env.npm_config_env === 'dev'?'development':'production',
    mode: 'development',
    entry: [
        "babel-polyfill",
        path.join(__dirname, './main1.js')
    ],
    output: {
        filename: "bundle.[hash:8].js"
    },
    devServer: {
        host: 'localhost',
        inline: true,
        port: 8081,
        open: false,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
              test: /\.html$/,
              use: ['html-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html',
            filename: './index.html',
            chunksSortMode: 'none',
            favicon: './favicon.ico',
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWER_SUPPORTS_HIML5: true,
            TWO: JSON.stringify('1+1'),
            CONSTANT: {
                APP_VERSION: JSON.stringify('1.1.2')
            }
        }),
        new CopyWebpackPlugin([
            {from: './test.txt', to: 'dist/test.txt'}
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};