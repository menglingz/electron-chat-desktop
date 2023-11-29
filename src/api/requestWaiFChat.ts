import axios from "axios"
import { ElMessage } from "element-plus"

const request = axios.create({
    baseURL: 'http://127.0.0.1:7878',
    timeout: 10000
})

request.interceptors.request.use(config => {
    return config
})

request.interceptors.response.use(res => {
    return res.data
}, error => {
    ElMessage({
        type: 'error',
        message: '请求失败'
    })
})

export default request