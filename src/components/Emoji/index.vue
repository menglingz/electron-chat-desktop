<template>
  <div class="container">
    <!-- 最近使用 -->
    <div v-if="historyEmojiList.length" class="use-wrap">
      <div class="emoji-title">最近使用</div>
      <div class="recently-use-emoji">
        <div v-for="(item, index) in historyEmojiList" :key="index" class="emoji-item" @click="appendEmoji(item)">
          <img :src="`./gif/${item}.gif`" alt="" />
        </div>
      </div>
    </div>
    <!-- 所有表情列表 -->
    <div class="emoji-title">小黄脸表情包</div>
    <div class="all-emoji">
      <div v-for="(item, index) in 203" :key="index" class="emoji-item" @click="appendEmoji(item)">
        <img :src="`./gif/${item}.gif`" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const props = defineProps(['historyEmojiList']);
const emit = defineEmits(['selectEmoji']);

const historyEmojiList1 = ref<number[]>([]);

watch(
  () => props.historyEmojiList,
  (val: number[]) => {
    historyEmojiList1.value = val;
  },
  { deep: true },
);

// 点击emoji, 输入框插入emoji回调
const appendEmoji = (i: number) => {
  emit('selectEmoji', i);
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 350px;
  padding: 5px 20px 15px;
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.emoji-title {
  font-size: 12px;
  margin: 10px 0 5px;
}

.recently-use-emoji,
.all-emoji {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .emoji-item {
    width: 30px;
    height: 30px;
    margin: 5px 10px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
