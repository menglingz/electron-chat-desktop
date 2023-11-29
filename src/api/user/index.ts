import request from '../requestWaiFChat';
import queryString from 'query-string';
import type { UpdateUserData, UpdateUserResponseData } from './type';

enum API {
  UPLOADUSERPIC_URL = '/upload/user', // 上传用户头像
  UPDATEUSERINFO_URL = '/update/user', // 更新用户信息
}

// 用户头像上传接口
export const reqUploaduploadUserPic = API.UPLOADUSERPIC_URL;
// 更新用户信息接口
export const reqUpdateUserInfo = (data: UpdateUserData) =>
  request<any, UpdateUserResponseData>({
    url: API.UPDATEUSERINFO_URL,
    method: 'post',
    data: queryString.stringify(data),
  });
