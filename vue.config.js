const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.6:3000/', // dev地址
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/api'
                }
            }
        }
    }
})
