// 3导入路由组件
import MyHome from "../pages/Home"
import MyLogin from "../pages/Login"
import MyRegister from "../pages/Register"
import MySearch from "../pages/Search"    
import Detail from "../pages/Detail"     //详情页
import ShopCart from "../pages/ShopCart"
import AddCartSuccess from "../pages/AddCartSuccess"
import MoviE from "../pages/Home/MoviE"

export default [
    // 配置重定向
    {
        path: "/shopcart",
        component: ShopCart,
        name: 'ShopCart',
        meta: {"isShow": true, 'title': ''}
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: {'isShow': true}
    },
    {
        path: '/detail/:skuid', //详情页
        component: Detail,
        meta: { isShow: true,},
    },
    {
        path: "/",
        redirect: "/myhome",
    },
    {
        path: "/myhome",
        name: 'myhome',
        component: MyHome,
        meta: {'isShow': true, 'title': '主页'},
        children: []
    },
    {
        path: "/movie",
        component: MoviE,
    },
    {
        path: "/mylogin",
        name: 'mylogin',
        component: MyLogin,
        meta: {'isShow': false, 'title': '登入'}
    },
    {
        path: "/myregister",
        name: 'myregister',
        component: MyRegister,
        meta: {'isShow': false, 'title': '注册'}
    },
    {
        path: "/mysearch/:keyword?",
        name: 'mysearch',
        component: MySearch,
        meta: {'isShow': true, 'title': '搜索'},
    },
    
    
   
]