import axios from "axios";
import router from "@/router";

const BASE_URL = process.env.NODE_HOST;

axios.defaults.timeout = 5000; // 超时时间设置
axios.defaults.withCredentials = true; // true允许跨域
axios.defaults.baseURL = BASE_URL;
// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        return response.status >= 200 && response.status < 300
            ? Promise.resolve(response)
            : Promise.reject(response);
    },
    // 服务器状态码不是2XX的的情况
    (error) => {
        if (!error.response) {
            console.log("網絡錯誤或者超時");
            return Promise.reject({message: "網絡錯誤或者超時"});
        }
        switch (error.response.status) {
            // 401: 未登录
            case 401:
                router.replace({path: "/"});
                break;
            case 403:
                // console.log('管理员权限已修改请重新登录')
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({path: "/"});
                }, 1000);
                break;
            case 404:
                console.log('請求頁面不存在');
                break;
            case 500:
                console.log("服務器錯誤");
                break;
        }
        return Promise.reject(error.response);
    }
);

export function getBaseURL() {
    return BASE_URL;
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deletes(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {params}).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => resolve(response.data),
            (error) => reject(error)
        );
    });
}
