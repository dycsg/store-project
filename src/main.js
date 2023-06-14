import Vue from "vue";
import App from "./App.vue";

// 配置三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
// 第一个参数全局组件的名字 第二个 组件的名称
Vue.component(TypeNav.name, TypeNav);

// 引入路由插件
import router from "@/router";
// 到入vuex
import store from "@/store";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 使用路由插件 使每个组件都有$route和$router路由器属性
  router,
  // 注册vuex
  store,
}).$mount("#app");
