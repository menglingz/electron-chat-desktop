<template>
  <div class="container">
    <!-- 顶部 -->
    <header class="drag">
      关于歪fChat
      <div v-if="!proxy.isMac" class="close no-drag">
        <el-icon @click="closeWin">
          <CloseBold />
        </el-icon>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <div class="img-top"></div>
      <MdPreview :modelValue="desc" id="md" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue';
import { getCurrentInstance, ref, onMounted, onBeforeUnmount } from 'vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const { ipcRenderer, shell } = require('electron');
const { proxy } = getCurrentInstance() as any;

let desc = ref<string>('');

ipcRenderer.send('read-file');

// @ts-ignore
ipcRenderer.on('read-file', (e: any, str: string) => {
  desc.value = str;
});

// 关闭窗口
const closeWin = () => {
  ipcRenderer.send('close-about');
};

onMounted(() => {
  document.querySelector('#md')!.addEventListener('click', openBrowser);
});

onBeforeUnmount(() => {
  document.querySelector('#md')!.removeEventListener('click', openBrowser);
});

// 打开浏览器
const openBrowser = (e: any) => {
  if (e.target.href) {
    let url = e.target.href;
    shell.openExternal(url);
  }
  e.preventDefault();
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    font-size: 15px;
    font-weight: bold;
    color: #505050;

    .close {
      width: 30px;
      height: 30px;
      position: fixed;
      top: 0;
      right: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  main {
    width: 100%;
    flex: 1;
    padding: 0 15px 15px;
    box-sizing: border-box;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .img-top {
      width: 100%;
      height: 150px;
      background-image: url(@/assets/images/about.jpg);
      background-position: center;
      background-size: cover;
    }
  }
}
</style>
