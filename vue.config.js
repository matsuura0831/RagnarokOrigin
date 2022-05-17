module.exports = {
    publicPath: '/',
    devServer: {
        port: 8888,
        disableHostCheck: true,
    },
    productionSourceMap: process.env.NODE_ENV === 'development'
};