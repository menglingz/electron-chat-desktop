<template>
  <div class="pop-content">
    <!-- 群聊 -->
    <div class="group-user-list" v-if="$route.query.type === 'group'" style="border-radius: 10px; overflow: hidden">
      <el-collapse model-value="1">
        <el-collapse-item :title="`群成员 (${groupUserList.length})`" name="1">
          <div class="group-user" v-for="(item, index) in groupUserList" :key="index">
            <div class="user-pic">
              <img :src="proxy.$baseUrl + item.userId.imgUrl" alt="" />
            </div>
            <div
              class="user-nick text-ellipsis"
              :style="item.userId._id === groupCreateUserId ? 'color: #f56c6c;max-width: 100px;' : 'max-width: 150px;'"
            >
              {{ item.userId.nick }}
            </div>
            <el-tag v-if="item.userId._id === groupCreateUserId" size="small" type="danger">群主</el-tag>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      class="edit"
      @click="editGroup"
      v-if="$route.query.type === 'group' && groupCreateUserId === userInfoStore.userInfo._id"
    >
      编辑群
    </div>
    <div class="quit" @click="handleQuit">
      {{
        $route.query.type === 'friend'
          ? '删除好友'
          : groupCreateUserId === userInfoStore.userInfo._id
            ? '解散群聊'
            : '退出群聊'
      }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reqGetGroupUser, reqDel } from '@/api/message/index';
import { GetGroupUserResponseData, GroupUser } from '@/api/message/type';
import { ref, watch, nextTick, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '@/store/modules/user';
import { useMessageStore } from '@/store/modules/message';
import { useRoute, useRouter } from 'vue-router';
const { ipcRenderer } = require('electron');
const userInfoStore = useUserInfoStore();
const messageStore = useMessageStore();
const $route = useRoute();
const $router = useRouter();
const { proxy } = getCurrentInstance() as any;

ipcRenderer.on('del-group-user', () => {
  getGroupUser();
});

watch(
  () => $route.query.id,
  () => {
    nextTick(() => {
      if ($route.query.type === 'group') {
        getGroupUser();
      }
    });
  },
  { immediate: true },
);

const groupUserList = ref<GroupUser[]>([]);
let groupCreateUserId = ref<string>('');

// 获取群成员列表
const getGroupUser = async () => {
  let groupId = $route.query.id as string;
  let res: GetGroupUserResponseData = await reqGetGroupUser(groupId);
  if (res.status === 200) {
    groupUserList.value = res.data.groupUser;
    groupCreateUserId.value = res.data.groupCreateUserId;
  }
};

// 删除好友/退出群聊按钮回调
const handleQuit = async () => {
  let msgInfo =
    $route.query.type === 'friend'
      ? '删除好友'
      : groupCreateUserId.value === userInfoStore.userInfo._id
        ? '解散群聊'
        : '退出群聊';
  ipcRenderer.send('open-dialog', msgInfo);
};

// 确认删除好友/退出群聊
const handleDetermineQuit = async () => {
  let userId = userInfoStore.userInfo._id;
  // 好友/群的id都在url中
  let urlId = $route.query.id as string;
  let res;
  if ($route.query.type === 'friend') {
    // 删除好友
    res = await reqDel('friend', { userId, friendId: urlId });
  } else if (groupCreateUserId.value === userInfoStore.userInfo._id && $route.query.type === 'group') {
    // 群主: 解散群聊
    res = await reqDel('group', { userId, groupId: urlId });
  } else {
    // 群成员退群
    res = await reqDel('groupUser', { userId, groupId: urlId });
  }
  if (res.status === 200) {
    ElMessage({ type: 'success', message: res.msg });
    messageStore.getMessageList();
    $router.push('/message');
  } else {
    ElMessage.error(res.msg);
  }
};

// 渲染进程监听主进程是否为确认按钮
ipcRenderer.on('dialog-determine', () => {
  handleDetermineQuit();
});

// 编辑群按钮回调
const editGroup = () => {
  ipcRenderer.send('open-group-edit', $route.query.id);
};
</script>

<style scoped lang="scss">
.pop-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .group-user-list {
    margin-bottom: 15px;

    .group-user {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

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
        margin-right: 7.5px;
      }
    }
  }

  .edit,
  .quit {
    width: 100%;
    height: 35px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7.5px;
    font-size: 13.5px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .quit {
    color: #ff3300;
  }
}
</style>
<style>
.el-collapse-item__header {
  padding-left: 10px !important;
}

.el-collapse-item__content {
  padding-bottom: 0 !important;
}
</style>
