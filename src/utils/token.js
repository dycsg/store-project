// 存token
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

// 或取token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
}

// 清除token
export const removeToken = () => {
  return localStorage.removeItem("TOKEN");
}
