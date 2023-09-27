// 因为项目大所有创建这个模块 对api统一管理
import requests from "./require.js";
import mockrequests from "./mockAjax.js";

// 三级联动接口 git 无参数
// 发请求： axios返回的结果是promise
export const reqCategoryList = () => {
  return requests.get(`/product/getBaseCategoryList`);
};
// 获取banner轮播图数据
export const reqGetBannerList = () => {
  return mockrequests.get("/banner");
};
// 获取floor小轮播图数据
export const reqFloorList = () => {
  return mockrequests.get("/floor");
};
// 搜索商品接口
export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "POST", data: params });
};
// 商品详情接口    /api/item/{ skuId}
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "GET" });

// 添加商品到购物车接口 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>requests({url: `/cart/addToCart/${ skuId }/${ skuNum }`,method: "POST"})

// 购物车接口  获取购物车数据不用传数据
export const reqCartList = () => requests({ url: "/cart/cartList", method: "GET"})

// 删除购物车产品/api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) =>requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE'})

// 修改产品的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`,method: "get"})

// 获取验证码 /api/user/passport/snedCode/phone
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`,method: 'GET'})

// 注册用户 /api/user/passport/register     带一个参数的总和
export const reqUserRegister = (data) => requests( {url:  `/user/passport/register`,data, method: 'POST'})

// 登入接口 /api/user/passport/login  地址上没有要带的参数就直接到data
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`,data,method: 'POST'})

// 获取用户信息tonke /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'GET' })

// 退出登录  /api/user/passport/logout
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'GET'})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqUserAddress = () => {
  return mockrequests.get('/address')
}

// 获取订单交易页信息 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}     除了订单号 其他已data形式传
export const reqSubnitOrder = (tradeNo,data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: 'POST' })