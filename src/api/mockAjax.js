// 对axios二次封装
import axios from 'axios'
// 引入进度条 调用函数 开始 结束   引入样式
import nprogress from 'nprogress'
// console.log(nprogress);
// 引入进度条样式
import "nprogress/nprogress.css"




// 创建实例
const requires = axios.create({
    // 配置对象
    baseURL: '/mock',
    // 请求超时时间 5m
    timeout: 4000
})


// 请求拦截器 发请求前做一些事情
requires.interceptors.request.use((config) => {
    nprogress.start()       // 进度条开始
    // config配置对象，headers请求头
    return config
    
})



// 响应拦截器
requires.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后可以做一些事情
    nprogress.done()      // 进度条结束
    return res.data
}, (error)=> {
    return error.message
})


// 对外暴露
export default requires