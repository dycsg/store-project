import Vue from "vue";
import App from "./App.vue";

// 配置三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
import CarouseL from "@/components/CarouseL";
// 第一个参数全局组件的名字 第二个 组件的名称
Vue.component(TypeNav.name, TypeNav);
Vue.component(CarouseL.name, CarouseL)
// 引入路由插件
import router from "@/router";
// 到入vuex
import store from "@/store";

Vue.config.productionTip = false;
// 引入mock模块
import "@/mock/mockServe";
// 引入全局swiper样式
import 'swiper/css/swiper.css';

new Vue({
  render: (h) => h(App),
  // 使用路由插件 使每个组件都有$route和$router路由器属性
  router,
  // 注册vuex
  store,
}).$mount("#app");
