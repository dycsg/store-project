// search 小仓库    发请求在api

// 1引入请求接口函数
import { reqGetSearchInfo } from "@/api";

const state = {
  // 4初始化仓库地址，根据数据类型绝定      5再动态展示
  searchList: {},
};
const mutations = {
  // 3步
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 2获取搜索模块的数据          默认参数空对象
  async getSearchList({ commit }, params = {}) {
    const result = await reqGetSearchInfo(params);
    // console.log(result);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 计算属性为了简化数据而生
const getters = {
  // 这里的形参state是上面的，为了简化他
  goodsList(state) {
    // console.log(state);
    return state.searchList.goodsList || []; //如果没有网络，则让他返回一个空数组 不这样的话网络请求失败返回的是undefinde，就不能遍历
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
// 暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
