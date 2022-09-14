/*
 * @Author: yjl
 * @Date: 2021-06-08 15:43:53
 * @LastEditors: yjl
 * @LastEditTime: 2021-06-08 15:45:06
 * @Description: file content
 */
import axios from 'axios'

// 天气接口
export function getWeather() {
    // return axios.get('https://v0.yiketianqi.com/api?version=v62&appid=75588717&appsecret=a36EhJyo&city=%E5%AE%81%E5%BE%B7')
    return axios.request({
        url: 'https://v0.yiketianqi.com/free/day',
        method: 'GET',
        params: {
            // version: "v61",
            appid: "75588717",
            appsecret: "a36EhJyo",
            city: "平谷"
        }
    })
}