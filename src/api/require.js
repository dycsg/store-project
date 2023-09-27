// 对axios二次封装
import axios from "axios";
// 引入进度条 调用函数 开始 结束   引入样式
import nprogress from "nprogress";
// console.log(nprogress);
// 引入进度条样式
import "nprogress/nprogress.css";
// 引入stoer里面的uuid_token
import store from "@/store";

// 创建实例
const requires = axios.create({
  // 配置对象
  baseURL: "/api",
  // 请求超时时间 5m
  timeout: 4000,
});

// 请求拦截器 发请求前做一些事情
requires.interceptors.request.use((config) => {
  // 如果detail仓库有uuid_token就让请求头config.headers添加一个字段，添加的是仓库里的uuid_token
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token; //userTempId与后端商量好的字段
  }

  // 如果user仓库有token就携带token给服务器，来返回用户信息
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }

  nprogress.start(); // 进度条开始
  // config配置对象，headers请求头
  return config;
});

// 响应拦截器
requires.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器响应数据回来以后可以做一些事情
    nprogress.done(); // 进度条结束
    return res.data;
  },
  (error) => {
    return error.message;
  }
);

// 对外暴露
export default requires;
