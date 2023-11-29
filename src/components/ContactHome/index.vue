<template>
  <!-- 用户主页 -->
  <div v-if="!homeType">
    <!-- 有数据内容部分 -->
    <div class="content" v-show="isUserSkeleton">
      <div class="user-pic" @click="handlePreview(proxy.$baseUrl + userHomeInfo.imgUrl)">
        <img :src="proxy.$baseUrl + userHomeInfo.imgUrl" alt="" />
      </div>
      <div class="user-nick">{{ userHomeInfo.nick }}</div>
      <div class="sign">{{ userHomeInfo.sign }}</div>
      <div class="user-info">
        <span>性别: {{ userHomeInfo.sex }}</span>
        <span v-if="userHomeInfo.birthday">生日: {{ userHomeInfo.birthday }}</span>
        <span v-if="userHomeInfo.start">星座: {{ userHomeInfo.start }}</span>
        <span>电话: {{ userHomeInfo.phone }}</span>
      </div>
      <!-- 图标 -->
      <div class="pop-contact" v-show="friendState == 1">
        <div class="message" @click="sendMessage">
          <svg
            t="1689688028031"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21296"
            width="15"
            height="15"
          >
            <path
              d="M892 141.6H134c-37.6 0-68 30.4-68 68v534.5c0 37.6 30.4 68 68 68h109.1l18.5 82c8.6 38 55.1 52.5 83.7 26l117-108H892c37.6 0 68-30.4 68-68V209.6c0-37.5-30.5-68-68-68zM314 507.8c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z m209.4 4c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z m209.4 0c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z"
              p-id="21297"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="phone">
          <svg
            t="1689687311236"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12916"
            width="15"
            height="15"
          >
            <path
              d="M620.678799 713.607618c1.842881-1.177396 22.165765-14.026373 28.103938-17.660945 10.954905-6.70604 20.015737-11.773963 29.12776-15.869254 63.732974-29.434908 119.94085-8.651303 194.270392 79.346273 45.969647 54.467377 59.586492 102.791817 41.823164 145.843569-13.207315 32.148038-38.700505 54.313804-84.055858 81.752257-2.917895 1.740499-29.025379 17.149033-35.731419 21.346707-105.60733 66.036576-347.587867-85.079681-521.637756-343.185429-174.459419-258.822424-219.610007-534.74269-112.620517-601.700706l14.077565-9.060833 15.357343-10.084655C243.400068 8.859139 278.056472-5.320808 319.11177 1.74357c40.952915 7.16676 75.865275 37.881447 105.351374 93.833367 62.19724 118.405116 48.478013 174.561801-31.533745 225.599371-5.733408 3.736954-26.209866 16.227593-28.103938 17.456181-19.606208 12.285875 13.616844 94.652425 90.81309 209.167014 78.168877 115.794368 143.539968 179.169004 164.937865 165.859306z"
              p-id="12917"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="video">
          <svg
            t="1689687973398"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="17502"
            width="15"
            height="15"
          >
            <path
              d="M647.725 840.897c0 0 93.091 0 93.091-93.091L740.816 282.353c0-93.091-93.091-93.091-93.091-93.091L93.091 189.262c0 0-93.091 0-93.091 93.091l0 465.453c0 93.091 93.091 93.091 93.091 93.091L647.725 840.897zM795.041 371.115 795.041 660.72l228.956 180.177L1023.997 189.263 795.041 371.115z"
              fill="#ffffff"
              p-id="17503"
            ></path>
          </svg>
        </div>
      </div>
      <div class="pop-contact" v-show="friendState == 2">
        <div class="add-friend" @click="handleAddFriend">
          <svg
            t="1695875812618"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5764"
            width="15"
            height="15"
          >
            <path
              d="M320 307.2c6.4-95.2 84.8-172.8 180-178.4 111.2-6.4 204 81.6 204 192 0 105.6-85.6 192-192 192-110.4 0-199.2-93.6-192-205.6zM575.2 768c0-72.8 40.8-136.8 100.8-168.8C616 584 556 576 511.2 576 384 576 128 640 128 768v96c0 17.6 14.4 32 32 32h464c-30.4-33.6-48.8-78.4-48.8-128zM896 736h-96v-96h-64v96h-96v64h96v96h64v-96h96v-64z"
              p-id="5765"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </div>
      <div class="pop-contact" v-show="friendState == 0">
        <span style="font-size: 15px; color: #8c8c8c; margin-top: 20px">好友申请中</span>
      </div>
    </div>
    <!-- 用户主页骨架屏 -->
    <div class="content" v-show="!isUserSkeleton">
      <el-skeleton animated>
        <template #template>
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center">
            <el-skeleton-item variant="circle" class="user-pic" />
            <el-skeleton-item variant="p" style="width: 100px; margin-bottom: 20px" />
            <el-skeleton-item variant="p" style="width: 200px; margin-bottom: 20px" />
            <div>
              <el-skeleton-item variant="text" style="width: 100px; margin-right: 10px" />
              <el-skeleton-item variant="text" style="width: 170px; margin-right: 10px" />
              <el-skeleton-item variant="text" style="width: 120px" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
  <!-- 群聊主页 -->
  <div v-else>
    <!-- 有数据部分 -->
    <div class="content" v-show="isGroupSkeleton">
      <div class="main">
        <div class="group-info-one">
          <div class="pic" @click="handlePreview(proxy.$baseUrl + groupHomeInfo.group?.imgUrl)">
            <img :src="proxy.$baseUrl + groupHomeInfo.group?.imgUrl" alt="" />
          </div>
          <div class="info-left">
            <div class="group-name">{{ groupHomeInfo.group?.groupName }}</div>
            <div class="group-code">群号: {{ groupHomeInfo.group?.groupNumber }}</div>
            <div class="create-time">创建时间: {{ groupHomeInfo.group?.creatTime }}</div>
          </div>
          <div class="group-btn" @click="handleGroupBtn">
            <el-icon color="#fff" size="20" v-show="groupState === 1">
              <ChatDotSquare />
            </el-icon>
            <el-icon color="#fff" size="20" v-show="groupState === 2">
              <Plus />
            </el-icon>
            <span v-show="groupState === 0" style="font-size: 12px; color: #fff">申请中</span>
          </div>
        </div>
        <!-- 群简介 -->
        <div class="group-sign">
          <el-icon size="16">
            <Document />
          </el-icon>
          <div class="title">群介绍</div>
          <div class="sign-text" @click="signDialog = true">
            {{ groupHomeInfo.group?.sign }}
            <el-icon size="15">
              <ArrowRight />
            </el-icon>
          </div>
        </div>
        <!-- 群成员 -->
        <div class="group-user">
          <div class="header">
            <el-icon size="16">
              <User />
            </el-icon>
            <div class="title">群成员 ({{ groupHomeInfo.groupUser?.length }}人)</div>
          </div>
          <div class="group-user-list">
            <div class="group-user-pic" v-for="(item, index) in groupHomeInfo.groupUser" :key="index">
              <img :src="proxy.$baseUrl + item.userId?.imgUrl" alt="" />
            </div>
          </div>
        </div>
        <!-- 群成员统计图 -->
        <div class="group-user-distribution">
          <div class="header">
            <el-icon size="16">
              <Clock />
            </el-icon>
            <div class="title">成员分布</div>
          </div>
          <div class="group-user-bar">
            <div class="bar-item">
              <el-progress
                type="dashboard"
                :stroke-width="3"
                :percentage="
                  groupHomeInfo.statis?.maleNum
                    ? Math.round((groupHomeInfo.statis?.maleNum / groupHomeInfo.groupUser?.length) * 10000) / 100
                    : 0
                "
                :color="colors"
              />
              <div class="bar-title">男-{{ groupHomeInfo.statis?.maleNum }}人</div>
            </div>
            <div class="bar-item">
              <el-progress
                type="dashboard"
                :stroke-width="3"
                :percentage="
                  groupHomeInfo.statis?.femaleNum
                    ? Math.round((groupHomeInfo.statis?.femaleNum / groupHomeInfo.groupUser?.length) * 10000) / 100
                    : 0
                "
                :color="colors"
              />
              <div class="bar-title">女-{{ groupHomeInfo.statis?.femaleNum }}人</div>
            </div>
            <div class="bar-item">
              <el-progress
                type="dashboard"
                :stroke-width="3"
                :percentage="
                  groupHomeInfo.statis?.is00sBornNum
                    ? Math.round((groupHomeInfo.statis?.is00sBornNum / groupHomeInfo.groupUser?.length) * 10000) / 100
                    : 0
                "
                :color="colors"
              />
              <div class="bar-title">00后-{{ groupHomeInfo.statis?.is00sBornNum }}人</div>
            </div>
          </div>
        </div>
        <el-dialog v-model="signDialog" title="群介绍" width="45%">
          <div style="padding: 30px 20px; box-sizing: border-box">{{ groupHomeInfo.group?.sign }}</div>
        </el-dialog>
      </div>
    </div>
    <!-- 群聊主页骨架屏 -->
    <div class="content" v-show="!isGroupSkeleton">
      <el-skeleton animated>
        <template #template>
          <div class="main" style="display: flex; justify-content: center; margin: 80px auto 0">
            <div
              class="group-info-one"
              style="display: flex; align-item: center; justify-content: center; border: none"
            >
              <el-skeleton-item variant="circle" class="user-pic" />
              <div
                class="info-left"
                style="
                  display: flex;
                  align-item: center;
                  justify-content: center;
                  padding: 0 20px 0;
                  box-sizing: border-box;
                "
              >
                <el-skeleton-item variant="text" style="margin-bottom: 10px" />
                <el-skeleton-item variant="text" style="margin-bottom: 10px" />
                <el-skeleton-item variant="text" style="margin-bottom: 10px" />
              </div>
            </div>
          </div>
          <div class="group-sign" style="width: 500px; margin: 0 auto" v-for="i in 2" :key="i">
            <el-skeleton-item variant="text" style="margin-bottom: 10px" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
  <!-- 好友/群头像预览 -->
  <el-image-viewer v-if="showPreviewImg" :url-list="urlList" @close="closePreviewImg" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { ChatDotSquare, Document, User, Clock, ArrowRight, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
// 引入api接口
import { reqGetUserContactHomeInfo, reqGetGroupContactHomeInfo, reqAddFriend, reqAddGroup } from '@/api/contact/index';
// 引入ts类型
import type {
  UserContactHomeResponseData,
  UserInfoType,
  GroupContactHomeResponseData,
  GroupInfoType,
  AddGroupResponseData,
  AddFriendResponseData,
} from '@/api/contact/type';
// router
import { useRouter } from 'vue-router';
// pinia仓库
import { useUserInfoStore } from '@/store/modules/user';
import { useMessageStore } from '@/store/modules/message';
// 全局事件总线
import $bus from '@/utils/eventBus';
// baseUrl, socket
const { proxy } = getCurrentInstance() as any;
// router
const $router = useRouter();
// pinia
const userInfoStore = useUserInfoStore();
const messageStore = useMessageStore();

$bus.on('contactHomeInfo', (val: any) => {
  val.listType = Number(val.listType);
  homeType.value = val.listType;
  getContactHomeInfo(val.id, val.listType);
});

// 主页类型
let homeType = ref<number>(0);
// 用户主页信息
let userHomeInfo = ref<UserInfoType>({} as UserInfoType);
// 用户骨架屏显示/隐藏
let isUserSkeleton = ref<boolean>(false);
// 群主页信息
let groupHomeInfo = ref<GroupInfoType>({} as GroupInfoType);
// 群骨架屏显示/隐藏
let isGroupSkeleton = ref<boolean>(false);
// 好友状态 state（0:申请中(发送方)，1:已为好友，2:未加好友=>数据库没记录，3（前端用来判断是否是自己主页），4:申请方(接收方)）
let friendState = ref<number>(2);
// 用户在群中状态 state => 0:申请中，1:已为加入该群，2:未加入群
let groupState = ref<number>(2);

// 获取主页信息
const getContactHomeInfo = async (id: string, type: number) => {
  if (type === 0) {
    // 用户主页
    let res: UserContactHomeResponseData = await reqGetUserContactHomeInfo({
      _id: userInfoStore.userInfo._id,
      urlId: id,
    });
    if (res.status === 200) {
      userHomeInfo.value = res.data.user;
      isUserSkeleton.value = true;
      friendState.value = res.data.friendState;
    }
  } else {
    // 群主页
    let res: GroupContactHomeResponseData = await reqGetGroupContactHomeInfo({
      userId: userInfoStore.userInfo._id,
      groupId: id,
    });
    // 查看当前用户是否加入该群（state => 0:申请中，1:已为加入该群，2:未加入群）
    if (res.status === 200) {
      groupHomeInfo.value = res.data;
      isGroupSkeleton.value = true;
      groupState.value = res.state;
    }
  }
};

// 添加好友回调
const handleAddFriend = async () => {
  let userId = userInfoStore.userInfo._id;
  let friendId = userHomeInfo.value._id;
  // 参数1: 用户id  参数2: 好友id
  let res: AddFriendResponseData = await reqAddFriend(userId, friendId);
  if (res.status === 200) {
    // 触发socket, 参数: toId: 对方用户id/群主id
    proxy.socket.emit('apply_notice', userHomeInfo.value._id);
    friendState.value = 0;
    ElMessage({ type: 'success', message: res.msg });
  } else {
    ElMessage.error(res.msg);
  }
};

// 给好友发消息回调
const sendMessage = async () => {
  let userId = userInfoStore.userInfo._id;
  let friendId = userHomeInfo.value._id;
  await messageStore.getFriendChatRecordsList(userId, friendId, 1);
  // 在pinia中暂存该用户信息
  let info = {
    imgUrl: userHomeInfo.value.imgUrl,
    lastMsg: {
      time: new Date(),
    },
    nick: userHomeInfo.value.nick,
    type: 'friendChat',
    unreadMsgCount: 0,
    _id: userHomeInfo.value._id,
  };
  messageStore.saveStagingInfo(info);
  $router.push({
    path: '/message',
    query: {
      type: 'friend',
      id: userHomeInfo.value._id,
      name: userHomeInfo.value.nick,
    },
  });
};

// 群主页按钮回调
const handleGroupBtn = async () => {
  let state = groupState.value;
  // state => 0:申请中，1:已为加入该群，2:未加入群
  if (state === 0) {
    return;
  } else if (state === 1) {
    let userId = userInfoStore.userInfo._id;
    let groupId = groupHomeInfo.value.group._id;
    await messageStore.getGroupChatRecordsList(userId, groupId, 1);
    // 在pinia中暂存群信息
    let info = {
      imgUrl: groupHomeInfo.value.group.imgUrl,
      lastMsg: {
        time: new Date(),
      },
      groupName: groupHomeInfo.value.group.groupName,
      type: 'groupChat',
      unreadMsgCount: 0,
      _id: groupHomeInfo.value.group._id,
    };
    messageStore.saveStagingInfo(info);
    $router.push({
      path: '/message',
      query: {
        type: 'group',
        id: groupHomeInfo.value.group._id,
        name: groupHomeInfo.value.group.groupName,
      },
    });
  } else {
    // 参数1: 群id  参数2: 用户id
    let groupId = groupHomeInfo.value.group._id;
    let userId = userInfoStore.userInfo._id;
    let res: AddGroupResponseData = await reqAddGroup(groupId, userId);
    if (res.status === 200) {
      // 触发socket, 参数: toId: 对方用户id/群主id
      proxy.socket.emit('apply_notice', groupHomeInfo.value.group.userId);
      groupState.value = 0;
      ElMessage({ type: 'success', message: res.msg });
    } else {
      ElMessage.error(res.msg);
    }
  }
};

// 图片预览的显示或隐藏
const showPreviewImg = ref<boolean>(false);
// 图片预览列表
let urlList = ref<string[]>([]);

// 点击图片预览回调
const handlePreview = (url: string) => {
  urlList.value = [];
  urlList.value.push(url as string);
  showPreviewImg.value = true;
};

// 图片预览关闭回调
const closePreviewImg = () => {
  urlList.value = [];
  showPreviewImg.value = false;
};

// 群简介dialog
const signDialog = ref<boolean>(false);

// 群成员分布的图表颜色
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-pic {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
    margin: 50px 0 30px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-nick {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .sign {
    font-size: 13px;
    color: #b1b1b1;
    margin: 5px 0 30px;
  }

  .user-info {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #8c8c8c;

    span {
      padding: 0 10px;
    }
  }

  .pop-contact {
    display: flex;

    .message,
    .phone,
    .video,
    .add-friend {
      cursor: pointer;
      width: 25px;
      height: 25px;
      background-color: #4a89fc;
      margin: 30px 30px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}

.main {
  width: 500px;
  margin-top: 80px;

  .group-info-one {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    border-bottom: 2px solid #f5f5f5;

    .pic {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info-left {
      width: 320px;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .group-name {
        font-weight: bold;
        margin-bottom: 10px;
      }

      .group-code,
      .create-time {
        font-size: 13.5px;
        color: #999;
        margin-bottom: 10px;
      }
    }

    .group-btn {
      align-self: center;
      width: 45px;
      height: 45px;
      background-color: #4a89fc;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .group-sign {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14.5px;

    .title {
      margin: 0 10px;
    }

    .sign-text {
      width: 400px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #999;
    }
  }

  .group-user,
  .group-user-distribution {
    width: 100%;
    margin-bottom: 10px;

    .header {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 14.5px;

      .title {
        margin: 0 10px;
      }
    }

    .group-user-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .group-user-pic {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin: 0 10px 10px 0;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .group-user-bar {
      width: 100%;
      display: flex;

      .bar-item {
        width: 25%;

        .bar-title {
          width: 80px;
          text-align: center;
          font-size: 13px;
        }
      }
    }
  }
}

:deep(.el-progress-circle) {
  width: 80px !important;
  height: 80px !important;
}

:deep(.el-dialog) {
  --el-dialog-margin-top: 30vh !important;
}
</style>
