const { defineConfig } = require('@vue/cli-service')

const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入
      patterns: [
        path.join(__dirname, './src/assets/styles/variable.less'),
        path.join(__dirname, './src/assets/styles/mixin.less')

      ]
    }
  },
  // chainWebpack: config => {   // 报错
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => Object.assign(options, { limit: 10000 }))
  // }
  configureWebpack: {
    devServer: {
      allowedHosts: ['www.corho.com'] // 此处是要改变的域名
    },
    externals: {
      qc: 'QC'
    }

  }
})
