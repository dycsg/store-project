// 1导入路由模块
import Vue from 'vue';
// 导入路由模块
import VueRouter from "vue-router";
// 使用路由插件
Vue.use(VueRouter);

// 3导入路由组件
import MyHome from "../pages/Home"
import MyLogin from "../pages/Login"
import MyRegister from "../pages/Register"
import MySearch from "../pages/Search"


// 解决多次点击报错
// 先把VueRouter原型对象push保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写push||replace
// 第一个参数 告诉原来push方法 你从哪里跳（传递哪里参数）
VueRouter.prototype.push = function(location, reslove, reject)  {
    if (reslove && reject){
        // .call调用函数一次，篡改函数的上下文一次，传递参数用逗号分隔
        originPush.call(this, location, reslove, reject)
    } else {
        originPush.call(this, location, () => {}, () =>{})
    }
}

// 第一个参数 告诉原来push方法 你从哪里跳（传递哪里参数）
VueRouter.prototype.replace = function(location, reslove, reject)  {
    if (reslove && reject){
        // .call调用函数一次，篡改函数的上下文一次，传递参数用逗号分隔
        originReplace.call(this, location, reslove, reject)
    } else {
        originReplace.call(this, location, () => {}, () =>{})
    }
}

// 2创建实例
const router = new VueRouter({
    routes: [
        // 配置重定向
        {
            path: "/",
            redirect: "/myhome",
        },
        {
            path: "/myhome",
            name: 'myhome',
            component: MyHome,
            meta: {'isShow': true, 'title': '主页'},
            children: []
        },
        {
            path: "/mylogin",
            name: 'mylogin',
            component: MyLogin,
            meta: {'isShow': false, 'title': '登入'}
        },
        {
            path: "/myregister",
            name: 'myregister',
            component: MyRegister,
            meta: {'isShow': false, 'title': '注册'}
        },
        {
            path: "/mysearch/:keyword?",
            name: 'mysearch',
            component: MySearch,
            meta: {'isShow': true, 'title': '搜索'}
        }
    ]
})


// 暴露路由
export default router



// 配置路由守卫
// router.beforeEach( (to, from ) => {

// })