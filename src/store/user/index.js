import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api";
// 引入操作token的模块函数
import { setToken, getToken,removeToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(), // localStorage.getItem("TOKEN"),第二种写法
  userInfo: {},
};
const mutations = {
  // 获取验证码
  GETCODE(state, code) {
    state.code = code;
  },
  //用户登录
  USERLOGIN(state, token) {
    state.token = token;
  },
  // 获取用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登入 清除仓库用户数据
  CLEAR(state) {
    state.token = ''
    state.userInfo = {};
    removeToken()  //调用删除函数 本地存储
  }
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
    // console.log(zyq);
    if (zyq.code == 200) {
      return alert("注册成功");
    } else {
      return Promise.reject(new Error("注册 fails"));
    }
  },
  //用户登入 token
  async userLogin({ commit }, data) {
    let dyc = await reqUserLogin(data);
    console.log(dyc);
    if (dyc.code == 200) {
      commit("USERLOGIN", dyc.data.token); //拿到数据
      // 用户已经成功登录并获取到了token,需要持久化存储
      setToken(dyc.data.token) //把服务器的token传过去   // localStorage.setItem("TOKEN", dyc.data.token);//第二种写法

      return alert("登录成功");
    } else {
      return Promise.reject(new Error("登录 Faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let dyc = await reqUserInfo();
    // console.log(dyc);
    if (dyc.code == 200) {
      commit("GETUSERINFO", dyc.data);
      return "ok";
      // }else{
      //   return Promise.reject(new Error("faile"))
    }
  },
  // 退出登录
  async UserLogout({commit}){
    let dyc = await reqLogout()
    // console.log(dyc);
    if(dyc.code == 200) {
      commit('CLEAR')   //action不能直接修改state需要提交一个moutation再修改数据
      return "ok";
    }else{
      return Promise.reject(new Error("faile"))
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

// 登入后返回的数据
// {
//     "nickName": "6289042",
//     "name": "6289042",
//     "userId": 9046,
//     "token": "d9f7837b1497466c939155795827313a"
// }
