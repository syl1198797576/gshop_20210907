/*
  使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/shop/goods', {code: 0, data: data.goods})
// 返回info的接口
Mock.mock('/shop/info', {code: 0, data: data.info})
// 返回rating的接口
Mock.mock('/shop/rating', {code: 0, data: data.ratings})
