// 通过mutation间接更新state的多个方法的对象
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RECEIVE_SHOPGOODS,
    RECEIVE_SHOPINFO,
    RECEIVE_SHOPRATING, INCREMENT_COUNTFOOD, DECREMENT_COUNTFOOD, CLEAR_SHOPLIST, RECEIVE_SEARCHSHOPS
} from "@/store/mutation-types";

import {
    reqAddress,
    reqShops,
    reqFoodCategorys,
    reqUserInfo,
    reqLoginOut,
    reqShopGoods,
    reqShopInfo,
    reqShopRating, reqSearchShops
} from "@/api";

export default {
    // 异步获取地址
    async getAddress({commit , state}) {
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    },
    // 异步获取食品分类列表
    async getCategorys({commit}) {
        // 发送异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation
        if (result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, {categorys})
        }
    },
    // 异步获取商家
    async getShops({commit , state}) {
        // 发送异步ajax请求
        const {longitude , latitude} = state
        const result = await reqShops(longitude , latitude)
        // 提交一个mutation
        if (result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },
    // 同步获取信息
    receiveUserInfo({commit}, userInfo){
        commit(RECEIVE_USERINFO, {userInfo})
    },
    // 异步获取用户信息
    async getUserInfo({commit}) {
        // 发送ajax
        const result = await reqUserInfo()
        // 提交mutation
        if (result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USERINFO, {userInfo})
        }
    },
    // 退出登陆
    async logout({commit}) {
        const result = await reqLoginOut()
        if (result.code === 0) {
            commit(RESET_USERINFO)
        }
    },

    // mock
    // 异步获取数据商家食物信息
    async getShopGoods({commit}) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_SHOPGOODS, {goods})
        }
    },
    // 异步获取商家信息
    async getShopInfo({commit}, callback) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_SHOPINFO, {info})
            callback && callback()
        }
    },
    // 异步获取商家评价信息
    async getShopRating({commit}, callback) {
        const result = await reqShopRating()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_SHOPRATING, {ratings})
            // 数据更新通知组件
            callback && callback()
        }
    },

    // 同步更新food中的Count的值
    updateCount({commit}, {isAdd, food}) {
        // true调用加法
        if (isAdd) {
            commit(INCREMENT_COUNTFOOD, {food})
        }else {
            commit(DECREMENT_COUNTFOOD, {food})
        }
    },
    // 同步清空购物车
    clearList({commit}) {
        commit(CLEAR_SHOPLIST)
    },

    // 异步搜索商家列表
    async getSearchList({commit, state}, keyword) {
        // 发送ajax
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShops(geohash, keyword)
        // 提交mutation
        if (result.code === 0){
            const searchShops = result.data
            commit(RECEIVE_SEARCHSHOPS, {searchShops})
        }
    },
}
