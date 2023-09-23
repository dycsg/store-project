import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 游客临时身份模块
import { getUUID } from "@/utils/uuid_token";

const state = {
  // 商品信息
  goodInfo: {}, //根据返回的值是上面数据类型
  // 添加购物车
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  // 商品信息
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
  // 添加购物车
  GETSHOPCART(state, shopcart) {
    state.shopcart = shopcart;
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
  // 添加购物车信息
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 解构购物车返回的数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // 不需要提交给仓库
    // console.log(result);
    // 但是需要判断它是否把我们加入购物车数据上传到服务器上了没有 ,组件上添加购物车事件会返回一个promise 一个成功一个失败回调
    if (result.code == 200) {
      return "ok"; //成功
    } else {
      return Promise.reject(new Error("faile")); //返回的是失败
    }
  },
};
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
