// 因为项目大所有创建这个模块 对api统一管理
import requires from "./require.js";

// 三级联动接口 git 无参数
// 发请求： axios返回的结果是promise
export const reqCategoryList = () =>
  requires({
    url: "/api/product/getBaseCategoryList",
    method: "git",
  });
