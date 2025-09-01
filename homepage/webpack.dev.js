const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.mjs',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js',
    },
    devtool: "eval-source-map",
    devServer: {
        hot: true,
        liveReload: true,
        client: {
            overlay: true
        },
        watchFiles: ["./src/*.html", "./src/sass/**/*.scss", "./src/*.{js,mjs}"],
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
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {presets: ['@babel/preset-env']}
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
                        options: {implementation: require("sass")}
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|avif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/i,
                type: 'asset/resource',
                generator: {filename: 'fonts/[name][ext][query]'}
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "bundle.css"}),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: 'body'
        })
    ]
};