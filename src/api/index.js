// 与后台交互模块
// 引入封装的ajax方法
import ajax from './ajax'
const BASE_URL = '/api'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情) param参数
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)
export const reqFoodCategorys = () => ajax(`${BASE_URL}/index_category`)
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表) query参数
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops`, {longitude, latitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})
// 在该案例中图片验证码为直接在src中请求，故不需要发送
// [5、获取一次性验证码](#5获取一次性验证码)
// export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
// [6、用户名密码登陆](#6用户名密码登陆)
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`${BASE_URL}/login_pwd`, {name, pwd, captcha}, 'POST')
// [7、发送短信验证码](#7发送短信验证码)
export  const reqMsgCode = phone => ajax(`${BASE_URL}/sendcode`, {phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)
export  const reqPhoneNumLogin = (phone, code) => ajax(`${BASE_URL}/login_sms`, {phone, code}, 'POST')
// [9、根据会话获取用户信息](#9根据会话获取)
export  const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
// [10、用户登出](#10用户登出)
export  const reqLoginOut = () => ajax(`${BASE_URL}/logout`)

//11.获取商家信息
export  const reqShopInfo = () => ajax('/shop/info')
//11.获取商家评分
export  const reqShopRating = () => ajax('/shop/rating')
//11.获取商家食品
export  const reqShopGoods = () => ajax('/shop/goods')
