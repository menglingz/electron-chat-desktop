<template>
  <ul class="list-content">
    <template v-if="msgLists.length">
      <li
        v-for="(item, index) in msgLists"
        :key="index"
        class="list-item"
        :class="$route.query.id === item._id ? 'active' : ''"
        @click="changeChatList(item, index)"
      >
        <div class="warp">
          <div class="user-img">
            <img :src="proxy.$baseUrl + item.imgUrl" alt="" />
          </div>
          <div class="user-info">
            <div class="nick text-ellipsis">{{ item.nick ? item.nick : item.groupName }}</div>
            <div class="time">{{ formatMessageDate(item.lastMsg.time) }}</div>
          </div>
          <div v-show="item.unreadMsgCount" class="dots">
            {{ item.unreadMsgCount > 99 ? '99+' : item.unreadMsgCount }}
          </div>
        </div>
      </li>
    </template>
    <template v-else>
      <div class="no-contact">
        <img src="@/assets/images/no_message.png" alt="" />
      </div>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, watch, nextTick, onBeforeUnmount } from 'vue';
// ts
import type { MessageList } from '@/api/message/type';
// pinia
import { useMessageStore } from '@/store/modules/message';
// router
import { useRouter, useRoute } from 'vue-router';
// utils
import { formatMessageDate } from '@/utils/formatMessageDate';
// pinia
const messageStore = useMessageStore();
// router
const $router = useRouter();
const $route = useRoute();
// baseUrl
const { proxy } = getCurrentInstance() as any;

const props = defineProps(['msgLists']);

const msgLists = ref<MessageList[]>([]);

watch(
  () => props.msgLists,
  (val: MessageList[]) => {
    nextTick(() => {
      msgLists.value = val;
      // 将消息设置为已读
      messageStore.setMessageRead();
      if (messageStore.stagingInfo._id) {
        // 暂存信息中保存了该好友/群信息
        const currentIndex = msgLists.value.findIndex(item => item._id === $route.query.id);
        // 还未于该好友发过消息
        if (currentIndex === -1) {
          msgLists.value.unshift(messageStore.stagingInfo);
          // 清空暂存信息
          messageStore.clearStagingInfo();
        }
      }
    });
  },
);

onBeforeUnmount(() => {
  // 清空暂存信息
  messageStore.clearStagingInfo();
});

// 当前选中的聊天下标
const listCurrentIndex = ref<number>(-1);
// 点击聊天列表切换的回调
const changeChatList = (item: MessageList, index: number) => {
  const id = item._id;
  if (id === $route.query.id) return;
  const type = item.type === 'friendChat' ? 'friend' : 'group';
  const name = item.type === 'friendChat' ? item.nick : item.groupName;
  $router.push({
    path: '/message',
    query: { id, type, name },
  });
  listCurrentIndex.value = index;
};
</script>

<style scoped lang="scss">
.list-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .list-item {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;

    .warp {
      width: 200px;
      height: 100%;
      display: flex;
      align-items: center;

      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 40px;
          height: 40px;
        }
      }

      .user-info {
        flex: 1;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
        box-sizing: border-box;

        .nick {
          max-width: 150px;
          font-size: 15px;
        }

        .time {
          font-size: 13px;
          color: #8c8c8c;
        }
      }

      .dots {
        height: 18px;
        background-color: #f56c6c;
        padding: 0 6px;
        overflow: hidden;
        font-size: 12px;
        border-radius: 10px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .active {
    background-color: #f4f4f4;
  }
}

.no-contact {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  img {
    width: 150px;
    height: 150px;
  }
}
</style>
