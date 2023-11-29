<template>
  <div class="space-content">
    <SpaceList :spaceDataList="spaceDataList" @commentRefresh="commentRefresh" />
    <!-- 发布动态按钮 -->
    <div class="release-btn" @click="drawer = true">
      <el-icon size="20" color="#fff">
        <Plus />
      </el-icon>
    </div>
    <!-- 弹出框 -->
    <el-drawer v-model="drawer" :direction="direction" size="40%">
      <template #default>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="[歪fChat]分享新鲜事..."
          maxlength="200"
          show-word-limit
          v-model="addSpaceText"
          style="margin-bottom: 10px"
        />
        <el-upload
          class="avatar-uploader"
          :action="proxy.$baseUrl + reqUploadPhoto"
          name="photos"
          :limit="9"
          v-model:file-list="fileList"
          list-type="picture-card"
          :multiple="true"
          :on-preview="handlePictureCardPreview"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon" size="20" color="#dcdee0">
            <CameraFilled />
          </el-icon>
        </el-upload>
        <!-- 上传图片预览 -->
        <el-image-viewer v-if="showPreviewImg" :url-list="urlList" @close="closePreviewImg" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">发布</el-button>
        </div>
      </template>
    </el-drawer>
    <div class="left">
      <!-- 刷新按钮 -->
      <div class="btn" @click="handleRefresh">
        <svg
          t="1694922337264"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2450"
          width="25"
          height="25"
        >
          <path
            d="M927.999436 531.028522a31.998984 31.998984 0 0 0-31.998984 31.998984c0 51.852948-10.147341 102.138098-30.163865 149.461048a385.47252 385.47252 0 0 1-204.377345 204.377345c-47.32295 20.016524-97.6081 30.163865-149.461048 30.163865s-102.138098-10.147341-149.461048-30.163865a385.47252 385.47252 0 0 1-204.377345-204.377345c-20.016524-47.32295-30.163865-97.6081-30.163865-149.461048s10.147341-102.138098 30.163865-149.461048a385.47252 385.47252 0 0 1 204.377345-204.377345c47.32295-20.016524 97.6081-30.163865 149.461048-30.163865a387.379888 387.379888 0 0 1 59.193424 4.533611l-56.538282 22.035878A31.998984 31.998984 0 1 0 537.892156 265.232491l137.041483-53.402685a31.998984 31.998984 0 0 0 18.195855-41.434674L639.723197 33.357261a31.998984 31.998984 0 1 0-59.630529 23.23882l26.695923 68.502679a449.969005 449.969005 0 0 0-94.786785-10.060642c-60.465003 0-119.138236 11.8488-174.390489 35.217667a449.214005 449.214005 0 0 0-238.388457 238.388457c-23.361643 55.252253-35.22128 113.925486-35.22128 174.390489s11.8488 119.138236 35.217668 174.390489a449.214005 449.214005 0 0 0 238.388457 238.388457c55.252253 23.368867 113.925486 35.217667 174.390489 35.217667s119.138236-11.8488 174.390489-35.217667A449.210393 449.210393 0 0 0 924.784365 737.42522c23.368867-55.270316 35.217667-113.925486 35.217667-174.390489a31.998984 31.998984 0 0 0-32.002596-32.006209z"
            fill=""
            p-id="2451"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpaceList from '@/components/SpaceList/index.vue';
import { onMounted, ref, getCurrentInstance } from 'vue';
// 引入api接口
import { reqGetSpaceList, reqUploadPhoto, reqAddSpace } from '@/api/space';
// 引入ts类型
import type { SpaceListResponseData, Spaces, AddSpaceResponseData, SpaceData } from '@/api/space/type';
// element-plus
import { ElMessage } from 'element-plus';
import { Plus, CameraFilled } from '@element-plus/icons-vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
// pinia仓库
import { useUserInfoStore } from '@/store/modules/user';
const userInfoStore = useUserInfoStore();
// baseUrl
const { proxy } = getCurrentInstance() as any;

onMounted(() => {
  getSpaceList();
});

// 存储空间动态列表
let spaceDataList = ref<Spaces>([]);
// 获取空间动态列表
const getSpaceList = async () => {
  let res: SpaceListResponseData = await reqGetSpaceList(userInfoStore.userInfo._id);
  if (res.status === 200) {
    const { _id } = userInfoStore.userInfo;
    res.data.forEach(i => {
      i.textarea = '';
      (i.placeholder = '评论'), (i.iptType = 0), (i.iptFromId = _id), (i.iptToId = _id);
      i.spaceCommentId = '';
    });
    spaceDataList.value = res.data;
  }
};

// 控制弹出框的显示或隐藏
const drawer = ref(false);
const direction = ref('rtl'); // 底部

// 发布动态文字
let addSpaceText = ref<string>('');
// 提交给后端的文件列表
const addSpacePhoto = ref<string[]>([]);

// 取消按钮回调
const cancelClick = () => {
  drawer.value = false;
  addSpaceText.value = '';
  urlList.value = [];
  fileList.value = [];
  addSpacePhoto.value = [];
};
// 发布按钮回调
const confirmClick = async () => {
  fileList.value.forEach(i => {
    // @ts-ignore
    addSpacePhoto.value.push(i.response.url[0]);
  });
  let spaceData: SpaceData = {
    userId: userInfoStore.userInfo._id,
    textDesc: addSpaceText.value,
    photos: addSpacePhoto.value,
  };
  let res: AddSpaceResponseData = await reqAddSpace(spaceData);
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: res.msg,
    });
    // 清空数据
    cancelClick();
    // 向列表中添加一条数据
    getSpaceList();
  } else {
    ElMessage.error(res.msg + '请稍后再试');
  }
};

// 文件上传的文件列表  { name: '', url: '' }
const fileList = ref<UploadUserFile[]>([]);

// 文件上传回调
// @ts-ignore
const handleChange: UploadProps['onChange'] = (response, uploadFile) => {
  // element-plus已经为成功做了处理
  if (response.status === 'fail') {
    // 失败
    ElMessage.error('图片上传失败');
  }
};
// 文件超出限制的回调
const handleExceed = () => {
  ElMessage.error('图片最大只能上传9张哦');
};

// 上传文件类型限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('只能上传图片哦');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片最大只能上传5MB!!!');
    return false;
  }
  return true;
};

// 图片预览列表
let urlList = ref<string[]>([]);
// 图片预览的显示或隐藏
const showPreviewImg = ref<boolean>(false);

// 点击图片预览回调
const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  urlList.value = [];
  urlList.value.push(uploadFile.url as string);
  showPreviewImg.value = true;
};
// 图片预览关闭回调
const closePreviewImg = () => {
  urlList.value = [];
  showPreviewImg.value = false;
};

// 刷新按钮回调
const handleRefresh = () => {
  getSpaceList();
};

// 评论成功刷新回调
const commentRefresh = () => {
  getSpaceList();
};
</script>

<style scoped lang="scss">
.space-content {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
}
.release-btn {
  width: 50px;
  height: 50px;
  background-color: var(--btn-bg);
  border-radius: 50%;
  overflow: hidden;
  position: fixed;
  top: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

.image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #909399;
  background-color: #f5f7fa;
}
.left {
  position: fixed;
  bottom: 20px;
  right: 20px;
  .btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.el-upload-list--picture-card .el-upload-list__item {
  width: 11vw;
  height: 11vw;
}
.el-upload--picture-card {
  width: 11vw;
  height: 11vw;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  width: 178px;
  height: 178px;
  text-align: center;
}
.el-drawer__header {
  display: none;
}
.avatar-uploader .el-upload {
  border: none;
  background-color: #f7f8fa;
}
</style>
