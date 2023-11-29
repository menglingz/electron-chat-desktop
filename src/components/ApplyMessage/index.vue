<template>
  <div class="apply-message-content">
    <div class="apply-message-title">
      {{ !props.titleType ? '好友通知' : '群通知' }}
    </div>
    <div v-if="friendNoagreeList.length && !props.titleType" class="apply-message-list">
      <div v-for="(item, index) in friendNoagreeList" :key="index" class="apply-message-item">
        <div class="pic">
          <img :src="proxy.$baseUrl + item.friendId?.imgUrl" alt="" />
        </div>
        <div class="info">
          <div class="nick">
            {{ item.friendId?.nick }}
          </div>
          <div class="info-bottom">
            <div class="desc">
              {{ item.state === 0 ? '正在验证你的申请' : '请求添加为好友' }}
            </div>
            <div class="time">
              {{ formatTime(new Date(item.time)) }}
            </div>
          </div>
        </div>
        <div v-if="item.state === 0" class="apply-state">等待验证</div>
        <div v-else class="apply-state">
          <el-button size="small" @click="handleAgreeBtn(item.friendId._id)">同意</el-button>
          <el-button type="danger" size="small" @click="handleRefuseBtn(item.friendId._id)">拒绝</el-button>
        </div>
      </div>
    </div>
    <div v-else-if="groupNoagreeList.length && props.titleType" class="apply-message-list">
      <div v-for="(item, index) in groupNoagreeList" :key="index" class="apply-message-item">
        <div class="pic">
          <img :src="proxy.$baseUrl + item.groupId?.imgUrl" alt="" />
        </div>
        <div class="info">
          <div class="nick">
            {{ item.groupId?.groupName }}
          </div>
          <div class="info-bottom">
            <div class="desc">
              {{ item.userId.nick + ' 申请加入你的群聊' }}
            </div>
            <div class="time">
              {{ formatTime(new Date(item.time)) }}
            </div>
          </div>
        </div>
        <div class="apply-state">
          <el-button size="small" @click="handleAgreeBtn(item.groupId._id, item.userId._id)">同意</el-button>
          <el-button type="danger" size="small" @click="handleRefuseBtn(item.groupId._id, item.userId._id)">
            拒绝
          </el-button>
        </div>
      </div>
    </div>
    <div v-else class="apply-message-list">
      <el-empty description="暂无申请消息" image="./images/no-contact.png" :image-size="200" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, getCurrentInstance, nextTick } from 'vue';
// api
import {
  reqGetFriendNoagreeList,
  reqGetGroupNoagreeList,
  reqAgreeFriend,
  reqRefuseFriend,
  reqAgreeGroup,
  reqRefuseGroup,
} from '@/api/contact/index';
import type {
  FriendNoagreeListResponseData,
  FriendNoagree,
  GroupNoagreeListResponseData,
  GroupNoagree,
  AgreeFriendResponseData,
  RefuseFriendResponseData,
  AgreeGroupResponseData,
  RefuseGroupResponseData,
} from '@/api/contact/type';
// pinia仓库
import { useUserInfoStore } from '@/store/modules/user';
import { useContactStore } from '@/store/modules/contact';
// utils
import { formatTime } from '@/utils/formatTime';
import { ElMessage } from 'element-plus';
// 全局事件总线
import $bus from '@/utils/eventBus';
// pinia
const userInfoStore = useUserInfoStore();
const contactStore = useContactStore();
// baseUrl
const { proxy } = getCurrentInstance() as any;

const props = defineProps(['titleType']);

watch(
  () => props.titleType === 0,
  () => {
    nextTick(() => {
      if (props.titleType === 0) {
        getFriendNoagreeList();
      } else {
        getGroupNoagreeList();
      }
    });
  },
  { immediate: true },
);

// 好友申请列表
const friendNoagreeList = ref<FriendNoagree[]>([]);

// 获取好友申请列表
const getFriendNoagreeList = async () => {
  const res: FriendNoagreeListResponseData = await reqGetFriendNoagreeList(userInfoStore.userInfo._id);
  // 0:申请中(发送方)，1:已为好友，2:未加好友=>数据库没记录，3（前端用来判断是否是自己主页），4:申请方(接收方)
  if (res.status === 200) {
    friendNoagreeList.value = res.data;
  }
};

// 群申请列表
const groupNoagreeList = ref<GroupNoagree[]>([]);

// 获取群申请列表
const getGroupNoagreeList = async () => {
  const res: GroupNoagreeListResponseData = await reqGetGroupNoagreeList(userInfoStore.userInfo._id);
  // 状态（0:申请中，1:已为加入该群，2:未加入群）
  if (res.status === 200) {
    groupNoagreeList.value = res.data;
  }
};

// 同意按钮回调
const handleAgreeBtn = async (id: string, userOtherId?: string) => {
  if (!props.titleType) {
    const userId = userInfoStore.userInfo._id;
    // 参数1: userId(自己的)  参数2: friendId
    const res: AgreeFriendResponseData = await reqAgreeFriend(userId, id);
    if (res.status === 200) {
      ElMessage({ type: 'success', message: res.msg });
      // 刷新申请列表
      getFriendNoagreeList();
      // 刷新好友列表
      $bus.emit('updateContactList', 0);
      // 将联系人未读消息 -1
      contactStore.updateContactNum(0);
      // 发送socket
      proxy.socket.emit('agree_apply', userOtherId);
    } else {
      ElMessage.error(res.msg);
    }
  } else {
    // 参数1: userId(当前申请好友的)  参数2: groupId
    const res: AgreeGroupResponseData = await reqAgreeGroup(userOtherId as string, id);
    if (res.status === 200) {
      ElMessage({ type: 'success', message: res.msg });
      // 刷新申请列表
      getGroupNoagreeList();
      // 联系人消息数 -1
      contactStore.updateContactNum(1);
      // 发送socket
      proxy.socket.emit('agree_apply', userOtherId);
    } else {
      ElMessage.error(res.msg);
    }
  }
};

// 拒绝申请按钮回调
const handleRefuseBtn = async (id: string, userOtherId?: string) => {
  if (!props.titleType) {
    const userId = userInfoStore.userInfo._id;
    // 参数1: userId(自己的)  参数2: friendId
    const res: RefuseFriendResponseData = await reqRefuseFriend(userId, id);
    if (res.status === 200) {
      ElMessage({ type: 'success', message: res.msg });
      // 刷新申请列表
      getFriendNoagreeList();
      // 将联系人未读消息 -1
      contactStore.updateContactNum(0);
    } else {
      ElMessage.error(res.msg);
    }
  } else {
    // 参数1: userId(当前申请好友的)  参数2: groupId
    const res: RefuseGroupResponseData = await reqRefuseGroup(userOtherId as string, id);
    if (res.status === 200) {
      ElMessage({ type: 'success', message: res.msg });
      // 刷新申请列表
      getGroupNoagreeList();
      // 联系人消息数 -1
      contactStore.updateContactNum(1);
    } else {
      ElMessage.error(res.msg);
    }
  }
};
</script>

<style scoped lang="scss">
.apply-message-content {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;

  .apply-message-title {
    padding: 25px 20px;
    box-sizing: border-box;
  }

  .apply-message-list {
    width: 100%;
    flex: 1;
    padding: 0 55px 10px;
    box-sizing: border-box;
    overflow: auto;

    .apply-message-item {
      width: 100%;
      height: 75px;
      background-color: #fff;
      border-radius: 7.5px;
      margin-bottom: 15px;
      padding: 15px 25px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 10px;

        .info-bottom {
          width: 100%;
          display: flex;
          align-items: center;
          font-size: 13.5px;

          .desc {
            margin-right: 10px;
            color: #333;
          }

          .time {
            color: #9b9b9b;
          }
        }
      }

      .apply-state {
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>
