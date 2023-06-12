import Vue from "vue";
import App from "./App.vue";
// 导入路由模块
import VueRouter from "vue-router";
// 引入路由插件
import router from "@/router";

// 配置三级联动组件--全局组件
import TypeNav from '@/pages/Home/TypeNav';
// 第一个参数全局组件的名字 第二个 组件的名称
Vue.component(TypeNav.name, TypeNav)



import {reqCategoryLIst} from '@/api'
reqCategoryLIst()




Vue.config.productionTip = false;

// 使用路由插件
Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  // 使用路由插件 使每个组件都有$route和$router路由器属性 
  router,
}).$mount("#app");

