const path = require('path');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Chalk = require('chalk');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    context: path.resolve(__dirname, 'src'),

    target: ['web', 'browserslist'],

    // webpack resolve modules
    resolve: {
        modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, 'src/scripts')],
        alias: {
            jquery: 'jquery/src/jquery',
        },
    },

    entry: {
        viraBoardPlugin: [
            './scss/main.scss',
            'viraBoard.js'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].min.js",
    },


    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new PrettierPlugin(),

        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),

        new ProgressBarPlugin({
            format:
                '  build [:bar] ' +
                Chalk.green.bold(':percent') +
                ' (:elapsed seconds)',
            complete: '#',
            clear: false,
        }),
    ],


}

module.exports = (env, { mode }) => {
    if (mode === "development") {
        config.stats = 'minimal';

        // config loaders for development mode
        config.module.rules.push({
                test: /\.(c|sa|sc)ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        );

        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'demo/demo.html'),
                minify: false,
                inject: false,
                scriptLoading: 'blocking',
            })
        )

        config.devServer = {
            contentBase: path.resolve(__dirname, 'dist'),
            port: 4500,
            open: true,
            hot: true,
            index: 'index.html',
            watchContentBase: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                https: true
            }
        };
    }

    if (mode === "production") {
        // remove jquery code for build
        config.externals = {
            jquery: 'jQuery',
        }

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/viraBoardPlugin.min.css',
            })
        );

        config.module.rules.push({
            test: /\.scss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            config: path.relative(
                                __dirname,
                                'postcss.config.js'
                            ),
                        },
                    },
                },
                'sass-loader',
            ],
        });

        config.stats = {
            assets: true,
            moduleAssets: true,
            assetsSort: '!size',
            errors: true,
        };
    }

    return config
}