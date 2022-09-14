/*
 * @Author: maggot-code
 * @Date: 2021-02-28 16:23:18
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-14 14:11:07
 * @Description: config options
 */
const path = require('path');
const webpack = require('webpack');
const resolves = dir => require('path').join(__dirname, dir);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pluginList = [
    new LodashModuleReplacementPlugin(),
    new CompressionWebpackPlugin({
        filename: info => `${info.path}.gz${info.query}`,
        algorithm: 'gzip',
        threshold: 10240 * 10, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js', 'css', 'json'].join('|') + ')$'),
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false, // 删除原文件
    }),
];

const OPTIONS = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        // 查看CSS属于哪个css文件
        sourceMap: process.env.NODE_ENV === 'development',
        extract: process.env.NODE_ENV === 'production',
    },
    devServer: {
        https: false,
        open: false,
        proxy: {
            '/FXAPI': {
                target: process.env.VUE_APP_BASE_URL,
                ws: false,
                secure: false,
                changeOrigin: true,
                pathReWrite: { '^/FXAPI': '' },
            },
            '/arcgis': {
                target: process.env.VUE_APP_ARCGIS_SERVER,
                ws: false,
                secure: false,
                changeOrigin: true,
                pathReWrite: { '^/arcgis': '' },
            },
            '/uploadFiles': {
                target: process.env.VUE_APP_IMG_SERVER,
                ws: false,
                secure: false,
                changeOrigin: true,
                pathReWrite: { '^/uploadFiles': '' },
            },
            '/mask': {
                target: process.env.VUE_APP_MASK_URL,
                ws: false,
                secure: false,
                changeOrigin: true,
                pathReWrite: { '^/mask': '' },
            },
            '/icm': {
                target: process.env.VUE_APP_ICMSERVER,
                ws: false,
                secure: false,
                changeOrigin: true,
                pathReWrite: { '^/icm': '' },
            },
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolves('src'));
        // 移除prefetch插件，避免加载多余的资源
        config.plugins.delete('prefetch');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload');
    },
    configureWebpack: config => {
        const cesiumSourcePath = 'node_modules/mars3d-cesium/Build/Cesium/'; // cesium库安装目录
        const cesiumRunPath = config.output.publicPath || './cesium/'; // cesium运行时路径
        // 调试JS
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map';
        } else {
            pluginList.push(new BundleAnalyzerPlugin());
        }

        //打包文件大小配置
        config.performance = {
            maxEntrypointSize: 10240 * 100,
            maxAssetSize: 10240 * 100,
        };
        // 公共代码抽离
        config.optimization = {
            // 分割代码块
            splitChunks: {
                cacheGroups: {
                    //公用模块抽离
                    common: {
                        chunks: 'initial',
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    },
                    vendor: {
                        priority: 1, //权重
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
                    },
                },
            },
        };
        config.module.unknownContextCritical = false;
        config.plugins.push(
            ...pluginList,
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify(path.join(cesiumRunPath)),
            }),
            // Cesium相关资源目录需要拷贝到系统目录下面（部分CopyWebpackPlugin版本的语法可能没有patterns）
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(cesiumSourcePath, 'Workers'),
                        to: path.join(cesiumRunPath, 'Workers'),
                    },
                    {
                        from: path.join(cesiumSourcePath, 'Assets'),
                        to: path.join(cesiumRunPath, 'Assets'),
                    },
                    {
                        from: path.join(cesiumSourcePath, 'ThirdParty'),
                        to: path.join(cesiumRunPath, 'ThirdParty'),
                    },
                    {
                        from: path.join(cesiumSourcePath, 'Widgets'),
                        to: path.join(cesiumRunPath, 'Widgets'),
                    },
                ],
            })
        );
        config.mode = process.env.NODE_ENV;
    },
};

module.exports = OPTIONS;
