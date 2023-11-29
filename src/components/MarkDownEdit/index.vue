<template>
  <div class="markdown-content">
    <el-dialog v-model="dialogVisible" top="0" :show-close="false" :lock-scroll="false" fullscreen>
      <div class="edit-content">
        <MdEditor
          v-model="text"
          class="no-drag"
          style="z-index: 99"
          :toolbars-exclude="toolbarsExclude"
          show-code-row-number
        />
        <div class="dialog-footer" style="z-index: 100">
          <el-button @click="handleClose">退出</el-button>
          <el-button type="primary" @click="handleSend">发送</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { formatTime } from '@/utils/formatTime';
import { ToolbarNames } from 'md-editor-v3';
// pinia
import { useUserInfoStore } from '@/store/modules/user';
import { useMessageStore } from '@/store/modules/message';
import type { MessageType } from '@/store/modules/interface/messageType';
// route
import { useRoute } from 'vue-router';
// pinia
const userInfoStore = useUserInfoStore();
const messageStore = useMessageStore();
// route
const $route = useRoute();
// socket
const { proxy } = getCurrentInstance() as any;

const props = defineProps(['markDownEditVisible']);
const emit = defineEmits(['handleMarkDownEditVisible']);

// 控制dialog显示或隐藏
const dialogVisible = ref<boolean>(false);

watch(
  () => props.markDownEditVisible,
  (val: boolean) => {
    dialogVisible.value = val;
  },
);

// 编辑器文本
const text = ref('# Hello 歪fChat Editor');
// 编辑器不展示的组件
const toolbarsExclude = ['mermaid', 'image', 'save', 'pageFullscreen', 'fullscreen', 'github'] as ToolbarNames[];

// 取消按钮回调
const handleClose = () => {
  emit('handleMarkDownEditVisible', false);
  text.value = '# Hello 歪fChat Editor';
};

// 发送按钮回调
const handleSend = () => {
  const { _id, nick, imgUrl } = userInfoStore.userInfo;
  const data: MessageType = {
    userId: {
      _id,
      nick,
      imgUrl,
    },
    time: formatTime(new Date()),
    msgType: 5,
    message: text.value,
  };
  // 发送者id
  const uId = _id;
  // 接收者id
  const toId = $route.query.id;
  messageStore.messageChatList.push(data);
  proxy.socket.emit(`${$route.query.type === 'friend' ? 'private' : 'group'}_chat`, data, uId, toId);
  handleClose();
};
</script>

<style scoped lang="scss">
.edit-content {
  width: 100%;
  height: 100vh;
  background-color: skyblue;

  .dialog-footer {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
}

.md-editor {
  width: 100%;
  height: 100%;
  padding: 20px 0 60px;
}
</style>
<style lang="scss">
.markdown-content {
  .el-dialog__header {
    display: none !important;
  }

  .el-dialog__footer {
    padding: 0 !important;
  }
}
</style>
