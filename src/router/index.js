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
    // 用户没有登录,不能去交易相关组件trade，以及支付相关pay paysuccess
    let toPath = to.path     //获取到用户去的是哪理
    // 没有登入去的是这些组件，得让它去登录组件    判断如果有字符串理有pay
    if(toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
      // 把未登录的时候想去而没有去成的路由组件，存储路由信息于地址栏中query     
      
      next('/mylogin?redirect='+toPath)
    }else {
      // 没有登入去的是home 搜索 购物车 可以进行放行
      next()
    }
  }
});

// 暴露路由
export default router;
