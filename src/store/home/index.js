// home 小仓库

// 引入请求接口函数
import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";

const state = {
  // 起始值 默认初始值不要瞎写 返回的是什么就用什么数据类型
  categoryList: [],
  // 起始值 轮播图数据
  BannerList: [],
  // 得看看数据是什么数据类型，这里就是什么类型
  floorList: []
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, BannerList) {
    state.BannerList = BannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};
const actions = {
  // 调用组件身上的dispatch 获取三级列表
  async categoryList({ commit }) {
    // 调用api里面的接口函数调用，获取数据
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
      // console.log(result.data);
    }
  },
  // 调用组件身上的dispatch 获取首页轮播图的数据
  async getBannerList({ commit }) {
    // 先执行reqGetBannerList
    let dyc = await reqGetBannerList();
    // console.log(dyc);
    if(dyc.code == 200){
      commit('GETBANNERLIST', dyc.data)
    }
  },
  // 调用组件身上的dispatch 获取小轮播图数据
  async getFloorList({ commit }) {
    const zyq = await reqFloorList()
    // console.log(zyq);
    if (zyq.code == 200) {
      commit('GETFLOORLIST', zyq.data)
    }
  }
};
const getters = {};

// 暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
