import { createApp } from 'vue'
import App from './App.vue'
// 重置css样式
import './style/reset.scss'
// 引入vue-router
import router from '@/router/index'
// 引入pinia
import pinia from '@/store/index'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入baseUrl
import { baseUrl } from '@/api/baseUrl'
// 引入路由守卫
import '@/router/permission'
// socketio 监听事件只能在main中, 触发可以在组件内
import socket from '@/socket/index'
// 监听socket事件
import '@/socket/listen-socket'
// windows右上角按钮
import WindowsBtn from '@/components/WindowsBtn/index.vue'

// 判断系统
const process = require('process')
const isMac = process.platform === 'darwin'

// 将用户信息存pinia
import { useUserInfoStore } from '@/store/modules/user'
const userInfoStore = useUserInfoStore(pinia)
let userInfo = localStorage.getItem('userInfo')
if (userInfo) {
  let obj = JSON.parse(userInfo)
  userInfoStore.login(obj)
}

const app = createApp(App)
// baseUrl
app.config.globalProperties.$baseUrl = baseUrl
// socket
app.config.globalProperties.socket = socket
// 判断系统是mac还是win
app.config.globalProperties.isMac = isMac

// 安装vue-router
app.use(router)
// 安装pinia
app.use(pinia)
// 安装element-plus
app.use(ElementPlus, {
  locale: zhCn
})
app.component('WindowsBtn', WindowsBtn)
// 挂载
app.mount('#app')