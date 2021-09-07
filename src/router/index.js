//路由器模块  配置路由
//引入Vue
import Vue from 'vue'
//引入路由器
import VueRouter from 'vue-router'
//引入路由组件
// import Msite from "@/pages/Msite/Msite";
// import Order from "@/pages/Order/Order";
// import Profile from "@/pages/Profile/Profile";
// import Search from "@/pages/Search/Search";

// 路由组件懒加载
const Msite = () => import('../pages/Msite/Msite')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
const Search = () => import('../pages/Search/Search')

import Login from "@/pages/Login/Login";
import Shop from "@/pages/Shop/Shop";
import ShopHeader from "@/components/ShopHeader/ShopHeader";
import ShopGoods from "@/pages/Shop/ShopGoods/ShopGoods";
import ShopRating from "@/pages/Shop/ShopRating/ShopRating";
import ShopInfo from "@/pages/Shop/ShopInfo/ShopInfo";
//声明使用插件
Vue.use(VueRouter)
//创建并暴露路由
export default new VueRouter({
    // 所有路由
    routes:[
        {
            //要先import
            path:'/msite',
            component:Msite,
            meta:{showFooter: true}
        },
        {
            //要先import
            path:'/order',
            component:Order,
            meta:{showFooter: true}
        },
        {
            //要先import
            path:'/profile',
            component:Profile,
            meta:{showFooter: true}
        },
        {
            //要先import
            path:'/search',
            component:Search,
            meta:{showFooter: true}
        },
        {
            //要先import
            path:'/login',
            component:Login
        },
        {
            //要先import
            path:'/shop',
            component:Shop,
            children: [
                {
                    path:'header',
                    component:ShopHeader
                },
                {
                    path:'goods',
                    component:ShopGoods
                },
                {
                    path:'rating',
                    component:ShopRating
                },
                {
                    path:'info',
                    component:ShopInfo
                },
                {
                    path:'',
                    redirect:'/shop/goods'
                }
            ]
        },
    //    添加默认显示
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})
