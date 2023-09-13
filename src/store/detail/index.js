import { reqGoodsInfo } from "@/api";

const state = {
  goodInfo: {}, //根据返回的值是上面数据类型
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  // 获取产品信息     提交参数 skuId
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      // 提交返回的数据 result
      commit("GETGOODINFO", result.data);
    }
  },
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state){
      return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(){
      return state.goodInfo.spuSaleAttrList
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
