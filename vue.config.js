const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/v1/member': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/v1/external': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    }
  }
})