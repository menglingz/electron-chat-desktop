<template>
  <div class="container">
    <header class="drag">{{ groupName }}</header>
    <main>
      <div class="title">群头像</div>
      <el-upload
        :action="proxy.$baseUrl + reqUploadGroupUrl"
        :limit="1"
        :show-file-list="false"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
      >
        <div class="group-pic">
          <img :src="proxy.$baseUrl + groupInfo.imgUrl" alt="" />
          <div class="pic-pop">
            <el-icon color="#fff" size="18">
              <Camera />
            </el-icon>
          </div>
        </div>
      </el-upload>
      <div class="title">群聊名称</div>
      <div class="input">
        <input type="text" v-model="groupInfo.groupName" maxlength="15" show-word-limit placeholder="请填写群名称" />
        <span>{{ groupInfo.groupName.length }}/15</span>
      </div>
      <div class="title">群简介</div>
      <div class="input">
        <input type="text" v-model="groupInfo.sign" maxlength="50" show-word-limit placeholder="请填写群简介" />
        <span>{{ groupInfo.sign.length }}/50</span>
      </div>
      <!-- 群成员列表 -->
      <div class="title" v-if="groupUserList.length > 0">群成员</div>
      <div class="group-user-list" v-if="groupUserList.length > 0">
        <div class="group-user-item" v-for="(item, index) in groupUserList" :key="index">
          <div class="user-pic">
            <img :src="proxy.$baseUrl + item.userId.imgUrl" alt="" />
          </div>
          <div class="user-nick text-ellipsis">{{ item.userId.nick }}</div>
          <el-button @click="delGroupUser(item.userId._id)" type="danger" text bg size="small" style="margin-left: auto"
            >踢出</el-button
          >
        </div>
      </div>
    </main>
    <footer>
      <el-button type="danger" bg @click="handleClose">取消</el-button>
      <el-button type="primary" bg @click="handleSave">保存</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';
import { Camera } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { reqGetGroupUpdateInfo, reqDel, reqSaveUpdateGroupInfo, reqUploadGroupUrl } from '@/api/message/index';
import type {
  GroupUser,
  GetGroupUpdateInfoResponseData,
  DelResponseData,
  SaveUpdateGroupInfoResponseData,
  UploadGroupPic,
} from '@/api/message/type';
import { useUserInfoStore } from '@/store/modules/user';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const { ipcRenderer } = require('electron');
const userInfoStore = useUserInfoStore();
const $route = useRoute();
const { proxy } = getCurrentInstance() as any;

onMounted(() => {
  getGroupUpdateInfo();
});

const groupInfo = ref<{ groupName: string; imgUrl: string; sign: string; _id: string }>({
  groupName: '',
  sign: '',
  imgUrl: '',
  _id: '',
});
const groupUserList = ref<GroupUser[]>([]);
const groupName = ref<string>('');

// 获取当前需要修改的群信息
const getGroupUpdateInfo = async () => {
  let groupId = $route.query.id as string;
  let groupLeaderId = userInfoStore.userInfo._id;
  let res: GetGroupUpdateInfoResponseData = await reqGetGroupUpdateInfo(groupId, groupLeaderId);
  if (res.status === 200) {
    groupUserList.value = res.data.groupUserList;
    groupInfo.value = res.data.groupInfo;
    groupName.value = res.data.groupInfo.groupName;
  }
};

// 头像上传失败回调
const handleUploadError: UploadProps['onError'] = () => {
  ElMessage.error('上传失败');
};

// 头像上传成功回调
const handleUploadSuccess: UploadProps['onSuccess'] = (response: UploadGroupPic) => {
  if (response.res_code === 0) {
    ElMessage({
      type: 'success',
      message: '头像更新成功',
    });
    groupInfo.value.imgUrl = response.url as string;
  }
};

// 踢出群聊按钮回调
const delGroupUser = async (userId: string) => {
  let ids = {
    userId,
    groupId: $route.query.id as string,
  };
  let res: DelResponseData = await reqDel('groupUser', ids);
  if (res.status === 200) {
    groupUserList.value = groupUserList.value.filter(item => item.userId._id !== userId);
    ElMessage({ type: 'success', message: '已踢出群聊' });
    ipcRenderer.send('del-group-user');
  } else {
    ElMessage.error(res.msg);
  }
};

// 取消按钮事件回调
const handleClose = () => {
  ipcRenderer.send('close-group-edit');
};

// 保存按钮回调
const handleSave = async () => {
  if (groupInfo.value.groupName === '') {
    return ElMessage.error('不能为空');
  } else if (groupInfo.value.sign === '') {
    return ElMessage.error('不能为空');
  }
  let res: SaveUpdateGroupInfoResponseData = await reqSaveUpdateGroupInfo(groupInfo.value);
  if (res.status === 200) {
    ipcRenderer.send('update-success', groupInfo.value.groupName);
  } else {
    ElMessage.error('保存失败, 请稍后再试');
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #e9e9e9;
    font-weight: bold;
  }

  main {
    width: 100%;
    flex: 1;
    padding: 15px;
    box-sizing: border-box;

    .title {
      padding: 0 10px;
      box-sizing: border-box;
      font-size: 13.5px;
      font-weight: #333;
    }

    .group-pic {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin: 10px 10px 15px;
      cursor: pointer;
      border: 2px solid #e9e9e9;
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
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .input {
      width: 100%;
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      border-radius: 8px;
      margin: 10px 0 15px;
      padding: 0 10px;
      box-sizing: border-box;

      input {
        width: 100%;
        font-size: 13.5px;
        border: none;

        &::-webkit-input-placeholder {
          font-size: 13.5px;
        }
      }

      span {
        font-size: 12px;
        color: #b0b0b0;
        margin-left: 7.5px;
      }
    }

    .group-user-list {
      width: 100%;
      max-height: 160px;
      background-color: #fff;
      border-radius: 8px;
      margin: 10px 0 15px;
      padding: 0 10px;
      box-sizing: border-box;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .group-user-item {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        font-size: 14.5px;

        .user-pic {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 7.5px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .user-nick {
          max-width: 150px;
        }
      }
    }
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 20px 15px 20px;
    box-sizing: border-box;
  }
}
</style>
