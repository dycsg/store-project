// 3导入路由组件
// import MyHome from "../pages/Home";

export default [
  // 配置重定向
  {
    path: "/center",
    meta: {  title: "订单" },
    component: () => import("@/pages/CenteR"),
    // 二级路由
    children: [
      {
        path: "myorder",
        meta: {  title: "我的订单" },
        component: () => import("@/pages/CenteR/MyOrder"),
      },
      {
        path: "grouporder",
        meta: {  title: "团购订单" },
        component: () => import("@/pages/CenteR/GroupOrder"),
      },
      {
        path: "/center", //配置重定向
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    meta: {  title: "支付成功" },
    component: () => import("@/pages/PaySuccess"),
  },
  {
    path: "/pay",
    component: () => import("@/pages/PaY"),
    meta: {  title: "支付" },
    beforeEnter: (to, from, next) => {
        if (from.path == "/trade" || from.path == "/"){
            next()
        }else{
            next(from.path);
        }
    }
  },
  {
    path: "/trade",
    component: () => import("@/pages/TradE"),
    meta: {  title: "提交订单" },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 想要去交易页，必须是从购物车而来
      if (from.path == "/shopcart" || from.path == "/") {
        next();
      } else {
        // 其他组件来的，让它停留在当前组件
        next(from.path);
      }
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    name: "ShopCart",
    meta: { isShow: true, title: "购物车" },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { isShow: true, title: "添加购物车" },
  },
  {
    path: "/detail/:skuid", 
    component: () => import('@/pages/Detail'),
    meta: { isShow: true, title: "详情"},
  },
  {
    path: "/",
    redirect: "/myhome",    //配置home重定向
  },
  {
    path: "/myhome",
    name: "myhome",
    component: () => import("@/pages/Home"),
    meta: { isShow: true, title: "主页" },
    children: [],
  },
  {
    path: "/movie",
    component: () => import("@/pages/Home/MoviE"),
    meta: {  title: "电影" }
  },
  {
    path: "/mylogin",
    name: "mylogin",
    component: () => import("@/pages/Login"),
    meta: { isShow: false, title: "登入" },
  },
  {
    path: "/myregister",
    name: "myregister",
    component: () => import("@/pages/Register"),
    meta: { isShow: false, title: "注册" },
  },
  {
    path: "/mysearch/:keyword?",
    name: "mysearch",
    component: () => import("@/pages/Search"),
    meta: { isShow: true, title: "搜索" },
  },
];
