<template>
  <div class="container">
    <header class="drag">
      <div class="title text-ellipsis">{{ title }}</div>
      <!-- 更多按钮 -->
      <div class="more no-drag" :style="proxy.isMac ? 'right: 15px;' : 'right: 45px;'">
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click">
          <el-icon size="18">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="copy" style="font-size: 13px">复制网址</el-dropdown-item>
              <el-dropdown-item @click="refresh" style="font-size: 13px">刷新</el-dropdown-item>
              <el-dropdown-item @click="open" style="font-size: 13px">用默认浏览器打开</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 关闭按钮 -->
      <div v-if="!proxy.isMac" class="close no-drag" @click="close">
        <el-icon size="18">
          <Close />
        </el-icon>
      </div>
    </header>
    <main>
      <webview class="webview" ref="webview" :src="$route.query.url"></webview>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { MoreFilled, Close } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const { ipcRenderer, shell } = require('electron');
const $route = useRoute();
const $router = useRouter();
const { proxy } = getCurrentInstance() as any;

let title = ref<string>($route.query.url as string);

// 复制链接
const copy = async () => {
  try {
    await navigator.clipboard.writeText($route.query.url as string);
    ElMessage({ type: 'success', message: '已复制' });
  } catch (error) {
    ElMessage.error('复制失败');
  }
};

// 刷新
const refresh = () => {
  $router.go(0);
};

// 用默认浏览器打开
const open = () => {
  shell.openExternal($route.query.url);
};

// 关闭当前窗口
const close = () => {
  ipcRenderer.send('close-webview');
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  position: relative;

  .title {
    max-width: 500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: #505050;
  }

  .more,
  .close {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .close {
    right: 15px;
  }
}

main {
  width: 100%;
  flex: 1;

  .webview {
    width: 100%;
    height: 100%;
  }
}
</style>
