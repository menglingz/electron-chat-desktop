import { defineStore } from 'pinia';
// 引入用户信息的ts类型
import type { UserStoreType, UserInfo, UpdateUserData } from './interface/userType';

export const useUserInfoStore = defineStore('userInfoStore', {
  state: (): UserStoreType => {
    return {
      userInfo: {
        _id: '',
        phone: '',
        token: '',
        nick: '',
        imgUrl: '',
        sex: '',
        birthday: '',
        start: '',
        sign: '',
      },
    };
  },
  actions: {
    login(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    logout() {
      this.userInfo = {
        _id: '',
        phone: '',
        token: '',
        nick: '',
        imgUrl: '',
        sex: '',
        birthday: '',
        start: '',
        sign: '',
      };
    },
    updateInfo(data: UpdateUserData) {
      const { nick, sex, imgUrl, birthday, start, sign } = data;
      this.userInfo.nick = nick;
      this.userInfo.sex = sex;
      this.userInfo.imgUrl = imgUrl;
      this.userInfo.birthday = birthday;
      this.userInfo.start = start as string;
      this.userInfo.sign = sign;
    },
  },
});
