// 1导入路由模块
import Vue from "vue";
// 导入路由模块
import VueRouter from "vue-router";
// 使用路由插件
Vue.use(VueRouter);

import routes from "./routes";
import store from "@/store";

// 解决多次点击报错
// 先把VueRouter原型对象push保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 重写push||replace
// 第一个参数 告诉原来push方法 你从哪里跳（传递哪里参数）
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    // .call调用函数一次，篡改函数的上下文一次，传递参数用逗号分隔
    originPush.call(this, location, reslove, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 第一个参数 告诉原来push方法 你从哪里跳（传递哪里参数）
VueRouter.prototype.replace = function (location, reslove, reject) {
  if (reslove && reject) {
    // .call调用函数一次，篡改函数的上下文一次，传递参数用逗号分隔
    originReplace.call(this, location, reslove, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 2创建实例
const router = new VueRouter({
  routes,
  //路由跳转滚动行为
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

// 配置路由守卫
router.beforeEach(async (to, from, next) => {
  // 用来测试放行
  // next();
  // console.log(to, from, next);
  // console.log(store);
  // 用户已经登入了
  // if(token){
  //   // 判断 用户点击的是登录路由 因为用户已经登录了就不要进行路由跳转让它放行到myhome首页路由
  //   if(to.path =='/mylogin'){
  //     // 放行到myhome首页路由
  //     next('/myhome');
  //   }else{
  //     // 点击的是任意路由除了mylogin路由
  //     if(name){
  //       //  判断用户有用户信息（name）属性 进行放行
  //       next()
  //     }else{
  //       try {
  //         // 判断 仓库里面没有用户信息（name）属性 就需要使用服务器返回的token再调用获取用户信息的函数
  //         await store.dispatch('getUserInfo')
  //         // 调取到了放行
  //         next();
  //       } catch (error) {
  //         // token没有用了失效了，需要删除token删除用户信息，直接调用仓库删除信息函数
  //         await store.dispatch('userLogout')
  //         // 再让用户重新登录
  //         next('/mylogin');
  //       }
  //     }
  //   }
  // }else{
  //   // 用户没有登入
  // }
  // console.log(store);
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  // console.log(name);
  // console.log(token);
  // 用户已经登入了
  if (token) {
    // 用户已经登录了但是点击的是登入和注册组件
    if (to.path == "/mylogin" || to.path == "/myregister") {
      // 让它跳转到首页
      next("/myhome");
    } else {
      // 用户点击的是其他页面搜索，购物车等 判断是否有name属性如果有就放行
      if (name) {
        next()   //放行
      } else {
        try {
          // 用户点击的是其他页面搜索购物车等 没有name属性 调用仓库获取信息接口获取name，token属性
          await store.dispatch("getUserInfo");
          next();  //再进行放行
        } catch (error) {
          // 用户点击的是其他页面搜索购物车  但是token失效了 调用仓库的删除用户信息接口
          await store.dispatch('UserLogout')
          // 让用户重新登录
          next('/mylogin')
        }
      }
    }
  } else {
    // 用户没有登录
    next();
  }
});

// 暴露路由
export default router;
