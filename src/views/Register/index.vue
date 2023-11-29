<template>
  <div class="container" v-loading="loading">
    <!-- 可拖拽 -->
    <div class="drag"></div>
    <div class="left">
      <div class="title" v-html="text"></div>
      <div class="desc">关于<span @click="aboutWaiFChat">歪fCHat</span></div>
    </div>
    <div class="right">
      <input type="text" class="inputs phone" placeholder="请输入您的手机号" v-model="userInfo.phone" />
      <input type="password" class="inputs pwd" placeholder="请输入您的密码" v-model="userInfo.password" />
      <input type="text" class="inputs nick" placeholder="请输入您的昵称" v-model="userInfo.nick" />
      <div class="tips">
        <div>已经有账号?<span @click="login">去登录</span></div>
      </div>
      <button @click="register">注册</button>
    </div>
  </div>
  <WindowsBtn v-if="!proxy.isMac && $route.path !== '/notes'" :color="'#4F4F4F'" />
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';
// 引入ts类型
import type { UserInfoData, RegisterResponse } from '@/api/login_register/type';
// 引入api接口
import { reqRegister } from '@/api/login_register/index';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
const { ipcRenderer } = require('electron');
const userInfoStore = useUserInfoStore();
const $router = useRouter();
const { proxy } = getCurrentInstance() as any;

onMounted(() => {
  print('WELCOME TO\nILOVEFCHAT');
});

let text = ref<string>('');
// 打印机效果
const print = async (printInfo: string) => {
  let printText = printInfo;
  for (let i = 0; i < printText.length; i++) {
    let str = printText.slice(i, i + 1);
    if (str === '\n') {
      text.value = text.value + '<br>';
    } else {
      await new Promise(resolve => {
        setTimeout(() => {
          text.value = text.value + str;
          resolve(null);
        }, 80);
      });
    }
  }
  text.value = text.value;
};

// 关于歪fChat回调
const aboutWaiFChat = () => {
  ipcRenderer.send('open-about');
};

// 收集用户信息
let userInfo = ref<UserInfoData>({
  phone: '',
  password: '',
  nick: '',
});

const loading = ref<boolean>(false);

// 注册按钮
const register = async () => {
  const { phone, password, nick } = userInfo.value;
  const phoneNumberRegex: RegExp = /^1[3456789]\d{9}$/;
  if (!phoneNumberRegex.test(phone)) {
    return ElMessage({
      type: 'warning',
      message: '请输入正确手机号',
    });
  } else if (!password) {
    return ElMessage({
      type: 'warning',
      message: '密码不能为空',
    });
  } else if (!nick) {
    return ElMessage({
      type: 'warning',
      message: '昵称不能为空',
    });
  } else if (nick.length > 15) {
    return ElMessage({
      type: 'warning',
      message: '昵称最大不能超过15个字',
    });
  }
  loading.value = true;
  let res: RegisterResponse = await reqRegister(userInfo.value);
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: '注册成功',
    });
    // 存本地
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    // 存pinia
    userInfoStore.login(res.data);
    $router.push('/message');
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    });
  }
  loading.value = false;
};

// 点击“去登录”提示
const login = () => {
  $router.push('/login');
};
</script>

<style scoped lang="scss">
.drag {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  user-select: none;
  -webkit-app-region: drag;
}

@font-face {
  font-family: 'Regular';
  font-weight: 400;
  src:
    url('../../assets/iconfont/login_register.woff2') format('woff2'),
    url('../../assets/iconfont/login_register.woff') format('woff');
  font-display: swap;
}

.container {
  width: 1000px;
  height: 600px;
  display: flex;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;

  .left {
    width: 100%;
    height: 100%;
    flex: 16;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20% 0;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      top: 40%;
      left: 30%;
      width: 280px;
      height: 100px;
      background: linear-gradient(to right, var(--primary-color), #c471ed, #f64f59);
      filter: blur(70px);
      transition: all 0.5s;
    }

    &:has(.desc:hover) {
      &::before {
        filter: blur(55px);
      }
    }

    .title {
      width: 100%;
      height: 120px;
      line-height: 60px;
      font-size: 40px;
      font-weight: bold;
      font-family: Regular;
      padding-left: 25%;
      box-sizing: border-box;
      color: #333;
      z-index: 2;
    }

    .desc {
      font-size: 15px;
      font-weight: bold;
      padding-left: 45%;
      margin-top: 10px;
      color: #505050;
      cursor: pointer;
      z-index: 2;

      span {
        color: #5140f0;
        text-decoration: underline;
      }
    }
  }

  .right {
    flex: 18;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .inputs {
      display: block;
      width: 290px;
      height: 55px;
      border-radius: 10px;
      border: 0;
      background-color: #f9f9f9;
      color: rgb(80, 82, 84);
      outline: none;
      padding: 20px;
      box-sizing: border-box;
      font-size: 15px;

      &::-webkit-input-placeholder {
        font-size: 13.5px;
      }
    }

    .phone,
    .pwd {
      margin-bottom: 25px;
    }

    .tips {
      width: 290px;
      text-align: right;
      margin-top: 10px;
      color: #aaacb0;
      font-size: 13px;

      span {
        color: rgb(68, 96, 241);
        cursor: pointer;
      }
    }

    button {
      width: 290px;
      height: 50px;
      background-color: var(--primary-color);
      border-radius: 10px;
      font-size: 15px;
      color: #fff;
      border: 0;
      font-weight: 600;
      margin: 30px 0;
      cursor: pointer;
      box-shadow: var(--primary-color) 0 20px 30px -10px;
      transition: box-shadow 0.3s;

      &:hover {
        box-shadow: var(--primary-color) 0 10px 30px -10px;
      }
    }
  }
}
</style>
