// 先引入mock模块
import Mock from "mockjs";
// 把json数据引入进来
import banner from "./banner.json";
import floor from "./floor.json";
import address from "./address.json"

// 使用mock数据 第一个参数：请求地址， 第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/address", { code: 200, data: address });
