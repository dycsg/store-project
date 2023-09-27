// 交易仓库
import { reqUserAddress, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: [],
};
const mutations = {
  // 获取用户地址信息
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  //获取订单页交易信息
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let dyc = await reqUserAddress();
    // console.log(dyc);
    if (dyc.code == 200) {
      commit("GETUSERADDRESS", dyc.data);
    }
  },
  // 获取订单页交易信息
  async getOrderInfo({ commit }) {
    let dyc = await reqOrderInfo();
    // console.log(dyc);
    if(dyc.code == 200){
        commit('GETORDERINFO', dyc.data);
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
