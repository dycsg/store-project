// 正则 临时身份
import { v4 as uuidv4 } from "uuid";
// 需要生成一个uuid 且每次执行不能发生改变，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid 看一下是否有
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果没有就生成一个
  if (!uuid_token) {
    // 生成
    uuid_token = uuidv4();
    // 本地存储存一次
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
//   一定要返回值
  return uuid_token;
};

// Usertempid:e1d305ea-3bb1-4ad8-8128-24c6f813787d


