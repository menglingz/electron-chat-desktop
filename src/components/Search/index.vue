<template>
  <div class="search-content drag">
    <!-- 搜索框 -->
    <div class="search-input no-drag">
      <div class="wrap">
        <el-icon>
          <Search color="#b1b1b1" size="30" />
        </el-icon>
        <input type="text" id="search-input" v-model="keyword" @click="handleSearchInput" />
        <el-icon v-if="props.showClose" class="close-icon" @click="handleClose">
          <Close color="#b1b1b1" size="20" style="cursor: pointer" />
        </el-icon>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search, Close } from '@element-plus/icons-vue';
// api
import { reqSearch } from '@/api/contact/index';
import type { KeywordResult } from '@/api/contact/type';

const props = defineProps(['showClose']);
const $emit = defineEmits(['changeSearch', 'getDataList']);

// 搜索框回调
const handleSearchInput = () => {
  $emit('changeSearch', true);
};

// 关闭图标回调
const handleClose = () => {
  $emit('changeSearch', false);
  keyword.value = '';
};

// 搜索关键字
let keyword = ref<string>('');
let timer: any = null;

// 输入框搜索关键字
watch(keyword, () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    handleSearchResutl();
  }, 1000);
});

const handleSearchResutl = async () => {
  if (!keyword.value) return $emit('getDataList', { friendList: [], groupList: [] });
  let res: KeywordResult = await reqSearch(keyword.value);
  if (res.status === 200) {
    $emit('getDataList', res.data);
  }
};
</script>

<style scoped lang="scss">
.search-content {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-input {
    width: 200px;
    height: 30px;
    display: flex;
    align-items: center;

    .wrap {
      flex: 1;
      height: 100%;
      border-radius: 20px;
      box-sizing: border-box;
      padding: 0 15px 0 15px;
      display: flex;
      align-items: center;
      background-color: #f4f4f4;
      position: relative;

      input {
        width: 100px;
        height: 20px;
        margin-left: 5px;
        border: none;
        background-color: #f4f4f4;
        font-size: 13px;
      }

      .close-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
      }
    }
  }
}
</style>
