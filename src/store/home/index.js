// home 小仓库

// 引入请求接口函数
import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
const actions = {
  // 调用组件身上的dispatch 函数
  async categoryList({ commit }) {
    // 调用api里面的接口函数调用，获取数据
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
      console.log(result.data);
    }
  },
};
const getters = {};

// 暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
