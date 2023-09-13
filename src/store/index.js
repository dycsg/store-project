import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shocpart from "./shocpart";

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shocpart
  },
});
