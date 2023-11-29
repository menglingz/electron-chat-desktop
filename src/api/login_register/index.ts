import request from "../requestWaiFChat";
import queryString from "query-string";
import type { UserInfoData, RegisterResponse, LoginResponse } from './type'

enum API {
    REGISTER_URL = '/register', // 注册接口
    LOGIN_URL = '/login' // 登录接口
}

// 注册接口
export const reqRegister = (userInfo: UserInfoData) => request<any, RegisterResponse>({url: API.REGISTER_URL, method: 'post', data: queryString.stringify(userInfo)})
// 登录接口
export const reqLogin = (userInfo: UserInfoData) => request<any, LoginResponse>({url: API.LOGIN_URL, method: 'post', data: queryString.stringify(userInfo)})