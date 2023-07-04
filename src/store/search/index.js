// search 小仓库

// 引入请求接口函数
import { reqGetSearchInfo } from "@/api";

const state = {
    // 初始化仓库地址，根据数据类型绝定
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList;
    }
};
const actions = {
  // 获取搜索模块的数据
  async getSearchList({ commit }, params = {}) {
    const dyc = await reqGetSearchInfo(params);
    // console.log(dyc);
    if(dyc.code == 200){
        commit('GETSEARCHLIST', dyc.data);
    }
  },
};
// 计算属性
const getters = {};
// 暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
