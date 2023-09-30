import Vue from "vue";
import App from "./App.vue";

// 配置三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
import CarouseL from "@/components/CarouseL";
import PaginaTion from "@/components/PaginaTion";

// 第一个参数全局组件的名字 第二个 组件的名称
Vue.component(CarouseL.name, CarouseL);
Vue.component(TypeNav.name, TypeNav);
Vue.component(PaginaTion.name, PaginaTion);
// 引入路由插件
import router from "@/router";
// 到入vuex
import store from "@/store";

Vue.config.productionTip = false;
// 引入mock模块
import "@/mock/mockServe";

// 引入全局swiper样式
import "swiper/css/swiper.css";

// 统一引入api下全部接口函数，不再需要一个一个引入
import * as API from "@/api";

// 按需引入Element-ui
import { MessageBox,Message} from "element-ui";
// 引入到全局 第一种方法

// 挂载到原型上     第二种方法 需要先引入
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 懒加载
import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/loading.gif')
const errorimage = require('./assets/error.gif')
Vue.use(VueLazyload, {
  error: errorimage,
  loading: loadimage,
})

// 引入表单校验插件   不需要暴露直接使用
import "./plugins/validate"


new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API; //推送到全局
  },
  // 使用路由插件 使每个组件都有$route和$router路由器属性
  router,
  // 注册vuex
  store,
}).$mount("#app");
