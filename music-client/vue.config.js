const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        NODE_HOST: '"http://localhost:8888"',
      });
      return definitions;
    });
  },
  devServer: {
    host: '0.0.0.0',           //允许所有网络接口访问
    port: 8080     ,           //端口号，可以根据需要修改,
    allowedHosts: 'all'     //禁用主机检查
  }
})
