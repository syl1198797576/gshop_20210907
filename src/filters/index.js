// 过滤器
import Vue from "vue";
import dayjs from "dayjs";

Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
    return dayjs(value).format(formatStr)
})
