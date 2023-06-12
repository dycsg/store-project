const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  // 代理服务器 解决跨域问题 重启生效 安装进度条 npm i --save nprogress
  devServer: {
    proxy: {
      api: {
        target: "http://39.98.123.211:8510",
      },
    },
  },
});
