import { reqGetCode, reqUserRegister } from "@/api";

const state = {
  code: "",
};
const mutations = {
  // 获取验证码
  GETCODE(state, code) {
    state.code = code;
  },
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let dyc = await reqGetCode(phone);
    console.log(dyc);
    if (dyc.code == 200) {
      commit("GETCODE", dyc.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户注册 没有返回数据不需要三连环
  async userRegister({ commit }, user) {
    let zyq = await reqUserRegister(user);
    console.log(zyq);
    if (zyq.code == 200) {
      return alert("注册成功");
    }else {
        return Promise.reject(new Error("注册 fails"));
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
