const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimazer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimazer[0].options.terserOptions.compress.drop_debugger = true
    }
  }
})
