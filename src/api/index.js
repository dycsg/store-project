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
