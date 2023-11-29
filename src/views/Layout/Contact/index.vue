<template>
  <div class="message-content">
    <!-- 聊天记录列表 -->
    <div class="chat-list">
      <!-- 头部可拖拽部分 -->
      <div class="top-drag">
        <Search :showClose="showClose" @changeSearch="changeSearch" @getDataList="getSearchDataList">
          <el-tooltip class="box-item" effect="dark" content="新建群聊" placement="right-start">
            <div class="add-btn no-drag" @click="createGroup">
              <svg
                t="1689680839420"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3330"
                width="20"
                height="20"
              >
                <path
                  d="M320 307.2c6.4-95.2 84.8-172.8 180-178.4 111.2-6.4 204 81.6 204 192 0 105.6-85.6 192-192 192-110.4 0-199.2-93.6-192-205.6zM575.2 768c0-72.8 40.8-136.8 100.8-168.8C616 584 556 576 511.2 576 384 576 128 640 128 768v96c0 17.6 14.4 32 32 32h464c-30.4-33.6-48.8-78.4-48.8-128zM896 736h-96v-96h-64v96h-96v64h96v96h64v-96h96v-64z"
                  p-id="3331"
                  fill="#b1b1b1"
                ></path>
              </svg>
            </div>
          </el-tooltip>
        </Search>
        <!-- dialog -->
        <el-dialog v-model="createGroupDialog" width="45%" :show-close="false" style="background-color: #f2f2f2">
          <template #header>
            <div style="width: 100%; text-align: center">新建群聊</div>
          </template>
          <div class="edit-content">
            <!-- 上传头像 -->
            <el-upload
              class="upload-demo"
              :limit="1"
              :show-file-list="false"
              :action="proxy.$baseUrl + reqUploadGroupPhoto"
              :on-error="handleUploadError"
              :on-success="handleUploadSuccess"
            >
              <div class="user-pic">
                <img v-if="ruleForm.imgUrl" :src="proxy.$baseUrl + ruleForm.imgUrl" alt="" />
                <div class="pic-pop">
                  <el-icon color="#fff" size="20">
                    <Camera />
                  </el-icon>
                </div>
              </div>
            </el-upload>
            <div class="form-content">
              <el-form :model="ruleForm" label-width="auto" :rules="rules">
                <el-form-item label="群名称" prop="groupName">
                  <el-input v-model="ruleForm.groupName" maxlength="15" show-word-limit placeholder="请填写群名称" />
                </el-form-item>
                <el-form-item label="群简介" prop="sign">
                  <el-input v-model="ruleForm.sign" maxlength="50" show-word-limit placeholder="请填写群简介" />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">创建</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="list" v-show="!showClose">
        <!-- 好友/群申请消息 -->
        <div class="apply-message-content">
          <div class="apply-message-friend" @click="handleShowApplyMessage(0)">
            好友通知
            <div class="right-wrap">
              <div class="dot" v-if="contactStore.friendContactNum != 0">
                {{ contactStore.friendContactNum > 99 ? '99+' : contactStore.friendContactNum }}
              </div>
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="apply-message-group" @click="handleShowApplyMessage(1)">
            群通知
            <div class="right-wrap">
              <div class="dot" v-if="contactStore.groupContactNum != 0">
                {{ contactStore.groupContactNum > 99 ? '99+' : contactStore.groupContactNum }}
              </div>
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
        <!-- 切换好友/群列表 -->
        <el-tabs stretch @tab-change="changeTab">
          <el-tab-pane label="好友"> </el-tab-pane>
          <el-tab-pane label="群聊"> </el-tab-pane>
        </el-tabs>
        <FriendOrGroupList
          :dataList="dataList"
          :showClose="showClose"
          :listType="listType"
          @changeRightComponent="changeRightComponent"
        />
      </div>
      <!-- 搜索列表 -->
      <div class="list search-list" v-show="showClose">
        <div class="friend-list" v-show="searchFriendsList.length">
          <div class="list-title">联系人</div>
          <FriendOrGroupList
            :dataList="searchFriendsList"
            :listType="0"
            :showClose="showClose"
            @changeRightComponent="changeRightComponent"
          />
        </div>
        <div class="group-list" v-show="searchGroupsList.length">
          <div class="list-title">群聊</div>
          <FriendOrGroupList
            :dataList="searchGroupsList"
            :listType="1"
            :showClose="showClose"
            @changeRightComponent="changeRightComponent"
          />
        </div>
        <div class="none-data" v-show="!searchFriendsList.length && !searchGroupsList.length">暂无更多</div>
      </div>
    </div>
    <!-- 默认组件 -->
    <div class="chat-content" v-show="showRightComponent == 0">
      <DefaultContent />
    </div>
    <!-- 联系人详情组件 -->
    <div class="chat-content" v-show="showRightComponent == 1">
      <ContactHome />
    </div>
    <!-- 申请消息组件 -->
    <div class="chat-content" v-if="showRightComponent == 2">
      <ApplyMessage :titleType="titleType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/index.vue';
import FriendOrGroupList from '@/components/FriendOrGroupList/index.vue';
import ContactHome from '@/components/ContactHome/index.vue';
import DefaultContent from '@/components/DefaultContent/index.vue';
import ApplyMessage from '@/components/ApplyMessage/index.vue';
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules, UploadProps } from 'element-plus';
import { ArrowRight, Camera } from '@element-plus/icons-vue';
// 全局事件总线
import $bus from '@/utils/eventBus';
// api
import { reqUploadGroupPhoto, reqCreateGroup, reqGetFriendList, reqGetGroupList } from '@/api/contact/index';
import type {
  CreateGroupResponseData,
  FriendType,
  GroupType,
  GetFriendListResponseData,
  GetGroupListResponseData,
} from '@/api/contact/type';
// pinia
import { useUserInfoStore } from '@/store/modules/user';
import { useContactStore } from '@/store/modules/contact';
// pinia
const userInfoStore = useUserInfoStore();
const contactStore = useContactStore();
// baseUrl
const { proxy } = getCurrentInstance() as any;

// emit在ApplyMessage组件中
$bus.on('updateContactList', (val: any) => {
  getList(val);
});

$bus.on('apply', () => {
  // 获取好友列表
  getList(0);
  // 获取群列表
  getList(1);
});

// search
// 控制关闭图标显示/隐藏
let showClose = ref<boolean>(false);

// 切换search组件
const changeSearch = (e: boolean) => {
  showClose.value = e;
};

// 好友列表
const friendsList = ref<FriendType[]>([]);
// 搜索组件的好友列表
const searchFriendsList = ref<FriendType[]>([]);
// 群聊列表
const groupsList = ref<GroupType[]>([]);
// 搜索组件的群聊列表
const searchGroupsList = ref<GroupType[]>([]);
const dataList = ref<FriendType[] | GroupType[]>([]);
// 列表数据类型 (0 => 好友列表, 1 => 群列表)
let listType = ref<number>(0);

// 获取搜索列表数据
type DataList = {
  friendList: FriendType[];
  groupList: GroupType[];
};
const getSearchDataList = (data: DataList) => {
  const { friendList, groupList } = data;
  searchFriendsList.value = friendList;
  searchGroupsList.value = groupList;
};

// 获取好友/群列表
onMounted(() => {
  // 获取好友列表
  getList(0);
  // 获取群列表
  getList(1);
});

// 获取好友/群列表
const getList = async (getType: number) => {
  if (!getType) {
    // getType 0 获取好友列表
    friendsList.value = [];
    let res: GetFriendListResponseData = await reqGetFriendList(userInfoStore.userInfo._id);
    if (res.status === 200) {
      res.data.forEach(item => {
        friendsList.value.push(item.friendId);
      });
      dataList.value = friendsList.value;
    }
  } else {
    groupsList.value = [];
    let res: GetGroupListResponseData = await reqGetGroupList(userInfoStore.userInfo._id);
    if (res.status === 200) {
      res.data.forEach(item => {
        groupsList.value.push(item.groupId);
      });
    }
  }
};

// 切换tab选项卡回调
const changeTab = (type: number) => {
  dataList.value = [];
  if (type == 0) {
    // 好友列表
    dataList.value = friendsList.value;
  } else {
    // 群列表
    dataList.value = groupsList.value;
  }
  listType.value = type;
};

// 控制默认组件的显示/隐藏
let showRightComponent = ref<number>(0);

// 切换默认组件
const changeRightComponent = (e: number) => {
  showRightComponent.value = e;
};

// 好友/群消息申请 标题
const titleType = ref<number>(-1);

// 点击好友/群消息申请 右侧组件切换展示
const handleShowApplyMessage = (type: number) => {
  titleType.value = type;
  showRightComponent.value = 2;
};

// 控制dialog显示与隐藏
const createGroupDialog = ref<boolean>(false);

// 创建群聊按钮回调
const createGroup = () => {
  createGroupDialog.value = true;
};

let ruleForm = ref({
  imgUrl: '',
  groupName: '',
  sign: '',
});

const ruleFormRef = ref<FormInstance>();

// @ts-ignore
const validateGroupName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('群名不能为空'));
  } else {
    if (ruleForm.value.groupName !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
};
// @ts-ignore
const validateSign = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('群简介不能为空'));
  } else {
    if (ruleForm.value.groupName !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
};

// 校验规则
const rules = reactive<FormRules<typeof ruleForm>>({
  groupName: [{ validator: validateGroupName, trigger: 'blur' }],
  sign: [{ validator: validateSign, trigger: 'blur' }],
});

interface responseUpload {
  res_code: number;
  name?: string;
  url?: string;
  msg?: string;
}

// 头像上传成功回调
const handleUploadSuccess: UploadProps['onSuccess'] = (response: responseUpload) => {
  if (response.res_code === 0) {
    ElMessage({
      type: 'success',
      message: '头像更新成功',
    });
    ruleForm.value.imgUrl = response.url as string;
  }
};

// 头像上传失败回调
const handleUploadError: UploadProps['onError'] = () => {
  ElMessage.error('上传失败');
};

// 取消按钮回调
const handleCancel = () => {
  ruleForm.value = {
    imgUrl: '',
    groupName: '',
    sign: '',
  };
  createGroupDialog.value = false;
};

// 确定按钮回调
const onSubmit = async () => {
  const { groupName, sign, imgUrl } = ruleForm.value;
  if (!groupName && !sign) return ElMessage({ type: 'warning', message: '请完整填写信息' });
  else if (!groupName) return ElMessage({ type: 'warning', message: '群名不能为空' });
  else if (!sign) return ElMessage({ type: 'warning', message: '群简介不能为空' });

  let data = {
    userId: userInfoStore.userInfo._id,
    groupName,
    sign,
    imgUrl,
  };
  let res: CreateGroupResponseData = await reqCreateGroup(data);
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: res.msg,
    });
    // 清空内容
    handleCancel();
    // 关闭dialog
    createGroupDialog.value = false;
    // 重新获取群列表
    await getList(1);
  } else {
    ElMessage.error(res.msg);
  }
};
</script>

<style scoped lang="scss">
.message-content {
  width: 100%;
  height: 100%;
  display: flex;

  .chat-list {
    width: 250px;
    height: 100%;
    background-color: #fbfbfb;
    display: flex;
    flex-direction: column;

    .apply-message-content {
      width: 100%;
      border-bottom: 2px solid #f5f5f5;

      .apply-message-friend,
      .apply-message-group {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 15px;
        color: #333;
        .right-wrap {
          margin-left: auto;
          display: flex;
          align-items: center;
        }
        .dot {
          margin-right: 10px;
          height: 18px;
          padding: 0 6px;
          background-color: #f56c6c;
          font-size: 12px;
          border-radius: 10px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .list {
      flex: 1;
      width: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .chat-content {
    flex: 1;
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.search-list {
  padding: 15px 20px;
  box-sizing: border-box;

  .friend-list,
  .group-list {
    .list-title {
      font-size: 13.5px;
      color: #999;
    }
  }
  .none-data {
    width: 100%;
    font-size: 13px;
    text-align: center;
    color: #8c8c8c;
  }
}

.add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}

:deep(.el-tabs__item.is-active) {
  color: #4a89fc;
}

:deep(.el-tabs__active-bar) {
  background-color: #4a89fc;
}

:deep(.el-tabs__item:hover) {
  color: #4a89fc;
}

:deep(.el-tabs__header) {
  margin: 0;
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
</style>
