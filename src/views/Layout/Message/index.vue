<template>
  <div class="message-content">
    <!-- 聊天记录列表 -->
    <div class="chat-list">
      <!-- 头部可拖拽部分 -->
      <div class="top-drag">
        <Search @click="goContact" />
      </div>
      <div class="list">
        <MessageList :messageList="messageStore.messageList" />
      </div>
    </div>
    <!-- 聊天详情 -->
    <div class="chat-content" v-if="$route.query.id">
      <MessageDetail />
    </div>
    <div class="chat-content" v-else style="background-color: #f8f8f8">
      <DefaultContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/index.vue';
import MessageList from '@/components/MessageList/index.vue';
import MessageDetail from '@/components/MessageDetail/index.vue';
import DefaultContent from '@/components/DefaultContent/index.vue';
import { onMounted } from 'vue';
// pinia
import { useMessageStore } from '@/store/modules/message';
// route
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const { ipcRenderer } = require('electron');
// pinia
const messageStore = useMessageStore();
// router
const $router = useRouter();
const $route = useRoute();

ipcRenderer.on('update-success', (e: any, groupName: string) => {
  ElMessage({ type: 'success', message: '已保存' });
  messageStore.getMessageList();
  $route.query.name = groupName;
});

onMounted(() => {
  // 获取聊天列表数据
  messageStore.getMessageList();
});

const goContact = () => {
  $router.push('/contact');
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
    background-color: var(--light-bg);
    display: flex;
    flex-direction: column;

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
    background-color: #f3f3f3;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
