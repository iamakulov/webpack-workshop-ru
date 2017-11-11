const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const basicConfig = {
    entry: './src/Feed/index.js',
    output: {
        path: path.resolve(__dirname, 'public', 'feed'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            },
            {
                test: /\.js/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['env', {
                                "targets": {
                                  "browsers": ["last 2 versions", "ie >= 11"]
                                }
                            }]],
                            plugins: ['lodash']
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('feed.css')
    ],
};

if (isProduction) {
    basicConfig.plugins = basicConfig.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production',
        }),
    ]);
} else {
    basicConfig.devServer = {
        contentBase: path.join(__dirname, "public"),
        publicPath: '/feed/',
        compress: true,
        port: 9000,
        proxy: {
            "/data": "http://localhost:3000"
        },
    };

    basicConfig.module.rules[0].use = ['css-hot-loader'].concat(basicConfig.module.rules[0].use);
}

module.exports = basicConfig;