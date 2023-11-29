<template>
  <div class="layout-content">
    <!-- 左侧边栏 -->
    <aside class="left-aside drag">
      <!-- 头像 -->
      <el-popover placement="right-end" :width="300" trigger="click" :show-arrow="false">
        <template #reference>
          <div class="user-pic no-drag">
            <img :src="proxy.$baseUrl + userInfoStore.userInfo.imgUrl" alt="" />
          </div>
        </template>
        <div class="user-pic-pop">
          <div class="user-bg"></div>
          <div class="user-info-opacity"></div>
          <div class="user-info-content">
            <!-- 顶部 -->
            <div class="user-info-header">
              <div class="user-info-pic">
                <img :src="proxy.$baseUrl + userInfoStore.userInfo.imgUrl" alt="" />
              </div>
              <div class="user-info-main">
                <div class="user-nick">{{ userInfoStore.userInfo.nick }}</div>
                <div class="user-phone">手机号 {{ userInfoStore.userInfo.phone }}</div>
              </div>
            </div>
            <!-- 其他信息 -->
            <div class="user-other-info-content">
              <el-row class="user-other-info-item">
                <el-col :span="6" class="info-title">性别</el-col>
                <el-col :span="18">{{ userInfoStore.userInfo.sex }}</el-col>
              </el-row>
              <el-row class="user-other-info-item" v-if="userInfoStore.userInfo.birthday">
                <el-col :span="6" class="info-title">生日</el-col>
                <el-col :span="18">{{ userInfoStore.userInfo.birthday }} {{ userInfoStore.userInfo.start }}</el-col>
              </el-row>
              <el-row class="user-other-info-item">
                <el-col :span="6" class="info-title">个性签名</el-col>
                <el-col :span="18">{{ userInfoStore.userInfo.sign }}</el-col>
              </el-row>
            </div>
            <el-divider />
            <!-- 编辑按钮 -->
            <div class="user-edit-content" @click="editUserInfo">
              <div class="edit-btn">
                <el-icon size="20" color="#333">
                  <EditPen />
                </el-icon>
              </div>
            </div>
            <!-- dialog -->
            <el-dialog v-model="editDialogVisible" width="45%" :show-close="false" style="background-color: #f2f2f2;">
              <template #header>
                <div style="width: 100%; text-align: center;">编辑资料</div>
              </template>
              <div class="edit-content">
                <!-- 上传头像 -->
                <el-upload :action="proxy.$baseUrl + reqUploaduploadUserPic" :limit="1" :show-file-list="false"
                  :on-error="handleUploadError" :on-success="handleUploadSuccess">
                  <div class="user-pic">
                    <img :src="proxy.$baseUrl + ruleForm.imgUrl" alt="">
                    <div class="pic-pop">
                      <el-icon color="#fff" size="20">
                        <Camera />
                      </el-icon>
                    </div>
                  </div>
                </el-upload>
                <div class="form-content">
                  <el-form :model="ruleForm" label-width="auto" :rules="rules">
                    <el-form-item label="昵称" prop="nick">
                      <el-input v-model="ruleForm.nick" maxlength="15" show-word-limit placeholder="请填写你的昵称" />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                      <el-select v-model="ruleForm.sex" placeholder="请选择你的性别" style="width: 100%" :teleported="false">
                        <el-option label="未知" value="未知" />
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                      <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="请选择你的生日" style="width: 100%"
                        :teleported="false" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item label="个签" prop="sign">
                      <el-input v-model="ruleForm.sign" maxlength="80" show-word-limit placeholder="请填写你的个性签名" />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="onSubmit">
                    保存
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </div>
      </el-popover>
      <!-- 菜单 -->
      <ul class="menu-content">
        <li class="menu-item no-drag" v-for="(item, index) in menuList" :key="index" @click="changeMenu(item.path)">
          <img v-if="$route.path === item.path" :src="item.active_icon" :alt="item.title" />
          <img v-else :src="item.icon" :alt="item.title" />
          <template v-if="item.path === '/message' && messageStore.messageTotal > 0">
            <div class="dot" v-if="item.isDot">{{ messageStore.messageTotal }}</div>
          </template>
          <template v-if="item.path === '/contact' && contactStore.friendContactNum + contactStore.groupContactNum > 0">
            <div class="dot" v-if="item.isDot">{{ contactStore.friendContactNum + contactStore.groupContactNum > 99 ?
              '99+' : contactStore.friendContactNum + contactStore.groupContactNum }}</div>
          </template>
        </li>
      </ul>
      <!-- 设置按钮 -->
      <div class="setup no-drag" @click="setupBtn">
        <svg t="1689402575827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="960" width="25" height="25">
          <path d="M568.32 553.0624m-279.3472 0a279.3472 279.3472 0 1 0 558.6944 0 279.3472 279.3472 0 1 0-558.6944 0Z"
            fill="#CFF6FF" p-id="961"></path>
          <path
            d="M563.2 954.2144H464.6912A88.9856 88.9856 0 0 1 375.808 865.28v-43.008a11.6736 11.6736 0 0 0-6.5024-10.6496 335.872 335.872 0 0 1-46.7456-27.0336 11.8272 11.8272 0 0 0-12.4928-0.256l-37.2224 21.504A88.9344 88.9344 0 0 1 151.296 773.12l-49.2544-85.2992a88.832 88.832 0 0 1 32.512-121.4464l37.0688-21.4016a12.1344 12.1344 0 0 0 5.9392-11.3152 333.42976 333.42976 0 0 1 0-53.6064 12.1344 12.1344 0 0 0-5.9392-11.3152l-37.0688-21.248a88.9856 88.9856 0 0 1-32.512-121.4464L151.2448 240.64a88.9856 88.9856 0 0 1 121.4976-32.5632l37.2224 21.504a11.8784 11.8784 0 0 0 12.544 0 337.4592 337.4592 0 0 1 46.7968-27.0336 11.6736 11.6736 0 0 0 6.5024-10.6496V148.48a88.9856 88.9856 0 0 1 88.8832-88.6784H563.2A88.9856 88.9856 0 0 1 652.1344 148.48v43.4176a11.776 11.776 0 0 0 6.5536 10.7008 338.8928 338.8928 0 0 1 46.08 26.8288 11.776 11.776 0 0 0 12.544 0.3072l40.448-22.9376a82.2272 82.2272 0 0 1 111.2064 27.8016 25.6 25.6 0 1 1-43.4688 27.0848 31.1808 31.1808 0 0 0-42.1376-10.5472l-40.192 23.1424a63.232 63.232 0 0 1-67.328-2.5088 282.0608 282.0608 0 0 0-39.2192-22.7328 63.2832 63.2832 0 0 1-35.84-56.9344V148.48a37.7344 37.7344 0 0 0-37.5808-37.4784H464.6912A37.7344 37.7344 0 0 0 427.008 148.48v43.0592a63.1296 63.1296 0 0 1-35.84 56.9344A285.7984 285.7984 0 0 0 351.5392 271.36a63.232 63.232 0 0 1-67.1744 2.4576l-37.2224-21.504A37.8368 37.8368 0 0 0 195.584 266.24l-49.2032 85.4016a37.6832 37.6832 0 0 0 13.7728 51.5072l37.0688 21.4016a63.5904 63.5904 0 0 1 31.3856 59.6992 280.23296 280.23296 0 0 0 0 45.5168 63.5904 63.5904 0 0 1-31.3856 59.6992l-37.0688 21.4016a37.6832 37.6832 0 0 0-13.7728 51.5072L195.6352 747.52a37.7344 37.7344 0 0 0 51.5072 13.824l37.2224-21.504a63.232 63.232 0 0 1 67.1744 2.4576 285.7984 285.7984 0 0 0 39.68 22.8864 63.1296 63.1296 0 0 1 35.84 56.9344V865.28a37.7344 37.7344 0 0 0 37.6832 37.6832H563.2a37.7344 37.7344 0 0 0 37.7344-37.6832v-43.4176a63.2832 63.2832 0 0 1 35.584-56.8832A287.0784 287.0784 0 0 0 675.84 742.4a63.1296 63.1296 0 0 1 67.2256-2.5088l37.6832 21.76a37.7344 37.7344 0 0 0 51.5072-13.824l49.2544-85.2992a37.7344 37.7344 0 0 0-13.824-51.5072L829.952 588.8a63.4368 63.4368 0 0 1-31.232-59.392c0.5632-7.424 0.8192-14.9504 0.8192-22.3744s0-15.0016-0.8192-22.4256A63.4368 63.4368 0 0 1 829.952 424.96l37.7856-21.8624a37.7344 37.7344 0 0 0 13.824-51.5072 25.6 25.6 0 0 1 44.3392-25.6 88.9856 88.9856 0 0 1-32.5632 121.4464l-37.7856 21.8624a11.9296 11.9296 0 0 0-5.9392 11.3152c0.6656 8.7552 0.9728 17.6128 0.9728 26.368s-0.3072 17.5616-0.9728 26.3168a12.032 12.032 0 0 0 5.9392 11.3664l37.7856 21.8112a88.9344 88.9344 0 0 1 32.5632 121.4464L876.6464 773.12a88.9856 88.9856 0 0 1-121.4464 32.5632l-37.6832-21.76a11.776 11.776 0 0 0-12.544 0.3072 340.3264 340.3264 0 0 1-46.3872 26.88 11.6736 11.6736 0 0 0-6.4512 10.6496v43.52A88.9856 88.9856 0 0 1 563.2 954.2144z"
            fill="#474747" p-id="962"></path>
          <path
            d="M513.536 673.9968A167.0144 167.0144 0 1 1 680.5504 506.88a167.168 167.168 0 0 1-167.0144 167.1168z m0-282.7776A115.8144 115.8144 0 1 0 629.3504 506.88a115.8656 115.8656 0 0 0-115.8144-115.6608z"
            fill="#1285EF" p-id="963"></path>
        </svg>
      </div>
    </aside>
    <!-- 路由 -->
    <RouterView />
    <WindowsBtn v-if="!proxy.isMac && $route.path !== '/notes'" :color="'#4F4F4F'" />
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref, onMounted } from "vue"
import { ElMessage, ElNotification } from 'element-plus'
import { EditPen, Camera } from '@element-plus/icons-vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
// api
import { reqUploaduploadUserPic, reqUpdateUserInfo } from '@/api/user/index'
// ts类型
import type { UploadPicResponseData, UpdateUserData, UpdateUserResponseData } from '@/api/user/type'
// router
import { useRoute, useRouter } from "vue-router"
// pinia
import { useUserInfoStore } from "@/store/modules/user"
import { useMessageStore } from '@/store/modules/message'
import { useContactStore } from "@/store/modules/contact"
const { ipcRenderer } = require('electron')
// router
const $route = useRoute()
const $router = useRouter()
// pinia
const userInfoStore = useUserInfoStore()
const messageStore = useMessageStore()
const contactStore = useContactStore()
// baseUrl
const { proxy } = getCurrentInstance() as any

// 连接socket
proxy.socket.io.connect()
proxy.socket.emit('login', userInfoStore.userInfo._id)

// 菜单列表
const menuList = reactive([
  {
    title: "消息",
    icon: "./svg/message.svg",
    active_icon: "./svg/message_active.svg",
    path: "/message",
    isDot: true
  },
  {
    title: "好友",
    icon: "./svg/contact.svg",
    active_icon: "./svg/contact_active.svg",
    path: "/contact",
    isDot: true
  },
  {
    title: "空间",
    icon: "./svg/space.svg",
    active_icon: "./svg/space_active.svg",
    path: "/space",
    isDot: false
  },
  {
    title: "留言板",
    icon: "./svg/notes.svg",
    active_icon: "./svg/notes_active.svg",
    path: "/notes",
    isDot: false
  }
])

// 切换菜单回调
const changeMenu = (path: string) => {
  $router.push(path)
}

// 设置按钮回调
const setupBtn = () => {
  // 清空pinia
  userInfoStore.logout()
  // 清空本地存储
  localStorage.removeItem("userInfo")
  localStorage.removeItem("emojiHistory")
  // 断开socket
  proxy.socket.emit('logout', userInfoStore.userInfo._id)
  // 退出登陆, 关闭所有子窗口
  ipcRenderer.send('logout')
  // 清空历史emoji
  $router.push("/login")
}

// 控制dialog的显示隐藏
let editDialogVisible = ref<boolean>(false)

// 更新用户信息按钮
const editUserInfo = () => {
  editDialogVisible.value = true
  ruleForm.sign = userInfoStore.userInfo.sign
}

const ruleForm = reactive({
  imgUrl: userInfoStore.userInfo.imgUrl,
  nick: userInfoStore.userInfo.nick,
  sex: userInfoStore.userInfo.sex,
  birthday: userInfoStore.userInfo.birthday,
  sign: userInfoStore.userInfo.sign
})

const ruleFormRef = ref<FormInstance>()

// @ts-ignore
const validateNick = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('昵称不能为空'))
  } else {
    if (ruleForm.nick !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  nick: [{ validator: validateNick, trigger: 'blur' }]
})

// 头像上传成功回调
const handleUploadSuccess: UploadProps['onSuccess'] = (response: UploadPicResponseData) => {
  if (response.res_code === 0) {
    ElMessage({
      type: 'success',
      message: '头像更新成功'
    })
    ruleForm.imgUrl = (response.url) as string
  } else {
    ElMessage.error(response.msg)
  }
}

// 头像上传失败回调
const handleUploadError: UploadProps['onError'] = () => {
  ElMessage.error('上传失败')
}

// 取消按钮回调
const handleCancel = () => {
  editDialogVisible.value = false
}

// 确定按钮回调
const onSubmit = async () => {
  const { nick, sex, birthday, sign, imgUrl } = ruleForm
  let data: UpdateUserData = {
    _id: userInfoStore.userInfo._id,
    nick,
    sex,
    birthday: birthday ? birthday : '',
    sign: sign ? sign : '这个人很高冷, 暂时没有留下什么',
    imgUrl
  }
  let res: UpdateUserResponseData = await reqUpdateUserInfo(data)
  if (res.status === 200) {
    Object.assign(data, { start: res.start })
    // 更新pinia
    userInfoStore.updateInfo(data)
    // 更新本地存储
    localStorage.setItem('userInfo', JSON.stringify(userInfoStore.userInfo))
    ElMessage({
      type: 'success',
      message: res.msg
    })
    // 关闭弹窗
    handleCancel()
  } else {
    ElMessage.error(res.msg)
  }
}

onMounted(() => {
  // 用户上线信息
  ElNotification({
    title: userInfoStore.userInfo.nick + '已上线',
    type: 'success'
  })
  // 获取加入的所有群聊信息
  messageStore.getAllGroup()
  if ($route.path !== '/message') {
    messageStore.getMessageList()
  }
})
</script>

<style scoped lang="scss">
.layout-content {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left-aside {
    width: 70px;
    height: 100%;
    background-color: #fff;
    // background-color: var(--dark-bg);
    box-sizing: border-box;
    padding: 50px 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 30px;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .menu-content {
      flex: 1;

      .menu-item {
        width: 30px;
        height: 30px;
        margin: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .dot {
          position: absolute;
          left: 20px;
          top: -5px;
          height: 18px;
          padding: 0 6px;
          background-color: #f56c6c;
          font-size: 12px;
          border-radius: 10px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99;
        }
      }
    }
  }
}

.user-pic-pop {
  width: 100%;
  overflow: hidden;
  border-radius: var(--el-popover-border-radius);
  position: relative;

  .user-bg {
    width: 100%;
    height: 100px;
    background-image: url(@/assets/images/user-bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .user-info-opacity {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff);
  }

  .user-info-content {
    padding: 0 15px;
    margin-bottom: 20px;
    box-sizing: border-box;

    .user-info-header {
      width: 100%;
      position: absolute;
      top: 60px;
      display: flex;
      align-items: center;

      .user-info-pic {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .user-info-main {
        .user-nick {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 2px;
          color: #333;
        }

        .user-phone {
          font-size: 12px;
          color: #999999;
        }
      }
    }

    .user-other-info-content {
      padding: 40px 0 0;

      .user-other-info-item {
        font-size: 13px;
        color: #333;
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;

        .info-title {
          color: #999999;
        }
      }
    }

    .user-edit-content {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .edit-btn {
        width: 40px;
        height: 40px;
        border: 1px solid #dddddd;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}

:deep(.el-divider--horizontal) {
  margin: 15px 0;
}

.edit-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;

  .user-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid #fff;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .pic-pop {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .form-content {
    width: 100%;
    margin-top: 15px;
  }
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__header) {
  margin: 0;
}
</style>
<style>
.el-popper.is-light {
  padding: 0;
}

.el-select-dropdown {
  position: absolute !important;
  left: 0px !important;
  top: 0px !important;
  background-color: #fff;
}

.el-picker__popper {
  width: 100%;
  position: absolute !important;
  left: 200px !important;
  top: -100px !important;
  background-color: #fff;
}

.el-popper__arrow {
  display: none !important;
}
</style>