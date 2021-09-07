// ajax请求函数模块
import axios from 'axios'
export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject)=>{
        let promise

    //  判断请求类型是否为get
        if (type === 'GET') {
        //    准备url query参数数据（?id=xxx&title=xxx）
            let dataStr = '' //空字符串用于拼接数据
            Object.keys(data).forEach(key => {
                // 每一个key都代表数据中的键，data[key]是值    例如 ' ' + id + = + xxx + &分隔符  -------->  id=xxx&
                dataStr += key + '=' + data[key] + '&'
            })
            // 如果字符串不为空就接着写值
            if (dataStr !== '') {
                // substring:截取 不取尾    截取第一位开始到&前的字符串  ------->  id=xxx
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                // 给url地址加上query参数
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        }else{
            // 发送post请求
            promise = axios.post(url, data)
        }

        // 调用then方法
        promise.then(response => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })
}
