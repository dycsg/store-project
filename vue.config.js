const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  productionSourceMap: false, //打包后去除Map文件 map可以准确的输出是那一行出错了
  
  // 代理服务器 解决跨域问题 重启生效 安装进度条 npm i --save nprogress
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
});
