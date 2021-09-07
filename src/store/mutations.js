// 引入vue
import Vue from "vue";
// 直接更新state的多个方法对象
import {
    CLEAR_SHOPLIST,
    DECREMENT_COUNTFOOD,
    INCREMENT_COUNTFOOD,
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS, RECEIVE_SEARCHSHOPS, RECEIVE_SHOPGOODS, RECEIVE_SHOPINFO, RECEIVE_SHOPRATING,
    RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO
} from "@/store/mutation-types";


export default {
    // 将接收的值赋给state中
    [RECEIVE_ADDRESS](state, {address}){
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, {categorys}){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, {shops}){
        state.shops = shops
    },
    [RECEIVE_USERINFO](state, {userInfo}){
        state.userInfo = userInfo
    },
    [RESET_USERINFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_SHOPINFO](state, {info}){
        state.info = info
    },
    [RECEIVE_SHOPGOODS](state, {goods}){
        state.goods = goods
    },
    [RECEIVE_SHOPRATING](state, {ratings}){
        state.ratings = ratings
    },
    [INCREMENT_COUNTFOOD](state, {food}){
        // 一开始food里面没count，所以要用set方法来生成一个具有数据绑定效果的count
        if (!food.count) {
            Vue.set(food, 'count', 1)
            // 将点击的food添加到cartfoods数组中
            state.cartFoods.push(food)
        }else {
            food.count++
        }
    },
    [DECREMENT_COUNTFOOD](state, {food}){
        if (food.count) {
            food.count--
            if (food.count===0) {
                //移除cartfoods中的food
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [CLEAR_SHOPLIST](state) {
        // 将cartfoods中每一项count设置为0
        state.cartFoods.forEach(food => food.count = 0)
        // 将cartfoods设置为空数组
        state.cartFoods = []
    },
    [RECEIVE_SEARCHSHOPS](state, {searchShops}) {
        state.searchShops = searchShops
    }
}
