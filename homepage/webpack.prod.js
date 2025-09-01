const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'production',
    entry: './src/index.mjs',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: {
                                list: [
                                    '...'
                                ]
                            },
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: { implementation: require("sass") }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|avif)$/i,
                type: 'asset/resource',
                generator: { filename: 'images/[name].[contenthash][ext][query]' }
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/i,
                type: 'asset/resource',
                generator: { filename: 'fonts/[name].[contenthash][ext][query]' }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "bundle.css" }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: 'body'
        })
    ]
};