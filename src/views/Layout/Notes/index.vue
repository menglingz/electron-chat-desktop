<template>
  <div class="notes-content">
    <canvas class="confetti" id="canvas"></canvas>
    <!-- 便签展示列表 -->
    <div class="notes-list" v-if="notesList.length">
      <div class="notes-item" v-for="(item, index) in notesList" :key="index">
        <div class="card" :style="`background-color: ${item.color};`">
          <div class="info">
            <div class="user-pic">
              <img :src="proxy.$baseUrl + item.userId?.imgUrl" alt="" />
            </div>
            <div class="nick">{{ item.userId?.nick }}</div>
            <el-popconfirm
              width="220"
              confirm-button-text="是的"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="您确定要删除该便签吗?"
              @confirm="handleConfirm(item._id)"
              v-if="item.userId._id === userInfoStore.userInfo._id"
            >
              <template #reference>
                <el-icon style="margin-right: 5px; cursor: pointer"><Delete /></el-icon>
              </template>
            </el-popconfirm>
          </div>
          <div class="text">{{ item.text }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
      <!-- 点击加载更多 -->
      <div class="loading-more" @click="loadingMore" v-show="!showLoadingMore">
        点击加载更多
        <el-icon class="loading-icon">
          <Loading />
        </el-icon>
      </div>
      <!-- 暂无更多 -->
      <div class="loading-more" v-show="showLoadingMore">暂无更多</div>
    </div>
    <!-- 空状态 -->
    <div class="notes-list no-data" v-else>
      <el-empty :image-size="200" />
    </div>
  </div>
  <!-- 编辑按钮 -->
  <div class="release-btn" @click="drawer = true">
    <el-icon size="20" color="#fff">
      <Plus />
    </el-icon>
  </div>
  <!-- 弹出框 -->
  <el-drawer v-model="drawer" :direction="direction" size="40%">
    <template #default>
      <el-input
        v-model="notesText"
        type="textarea"
        :rows="6"
        placeholder="[歪fChat]请留下你想说的话..."
        maxlength="150"
        show-word-limit
      />
      <div class="notes-choose-color">
        <div class="color-title">颜色选择</div>
        <div class="color-list">
          <div
            class="color-item"
            v-for="(item, index) in notesColorArr"
            :key="index"
            :style="` background-color:${item};`"
            @click="changeNotesColor(index)"
          >
            <el-icon color="#7f7a54" v-show="notesColorCurrentIndex === index"><Select /></el-icon>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">发布</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';
import { reqAddNotes, reqGetNotes, reqDelNotes } from '@/api/notes/index';
import type {
  AddNotesResponseData,
  NotesData,
  NotesResponseData,
  GetNotesResponseData,
  DelNotesResponseData,
} from '@/api/notes/type';
// icon
import { Plus, Select, Loading, Delete, InfoFilled } from '@element-plus/icons-vue';
// element-plus
import { ElMessage } from 'element-plus';
// 格式化时间函数
import { formatTime } from '@/utils/formatTime';
// router
import { useRouter } from 'vue-router';
const $router = useRouter();
// store
import { useUserInfoStore } from '@/store/modules/user';
const userInfoStore = useUserInfoStore();
// baseUrl
const { proxy } = getCurrentInstance() as any;

onMounted(() => {
  initCanvas();
  getNotes();
});

const initCanvas = () => {
  const canvas: any = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // @ts-ignore
  let cx = ctx.canvas.width / 2;
  // @ts-ignore
  let cy = ctx.canvas.height / 2;

  let confetti: any = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' },
  ];

  const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30),
        },
        position: {
          x: randomRange(0, canvas.width),
          y: canvas.height - 1,
        },
        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },
        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50),
        },
      });
    }
  };
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((confetto: any, index: any) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
      confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
    if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
  };

  initConfetti();
  render();
};

// 便签列表
let notesList = ref<NotesResponseData[]>([]);
// 加载更多文字
let showLoadingMore = ref<boolean>(false);
// 获取便签
const getNotes = async (pageNum?: number) => {
  let res: GetNotesResponseData = await reqGetNotes(pageNum);
  if (res.status === 200) {
    res.data.forEach(i => {
      i.time = formatTime(new Date(i.time));
    });
    notesList.value = [...notesList.value, ...(res.data as any)];
    if (res.data.length < 12) {
      // 12是后端每页数据的条数
      showLoadingMore.value = true;
    }
  }
};

// 当前页数
let pageNum = ref<number>(1);
// 加载更多
const loadingMore = () => {
  pageNum.value++;
  getNotes(pageNum.value);
};

// 便签背景颜色
let notesColorArr = ref<string[]>(['#fff5a8', '#fbdc7c', '#cfffce', '#cde8ff', '#e6c6ff', '#ffc4c5']);
// 当前选择便签颜色下标
let notesColorCurrentIndex = ref<number>(0);
// 更改便签颜色回调
const changeNotesColor = (index: number) => {
  notesColorCurrentIndex.value = index;
};

// 控制弹出框的显示或隐藏
const drawer = ref<boolean>(false);
const direction = ref('rtl'); // 底部
// 收集便签内容
let notesText = ref<string>('');
// 取消事件回调
const cancelClick = () => {
  // 文字清空
  notesText.value = '';
  // 颜色默认选择为1
  notesColorCurrentIndex.value = 0;
  drawer.value = false;
};
// 发布按钮回调
const confirmClick = async () => {
  if (!notesText.value) {
    return ElMessage({
      message: '留言的内容不能为空哦~',
      type: 'warning',
    });
  }
  let notesData: NotesData = {
    userId: userInfoStore.userInfo._id,
    text: notesText.value,
    color: notesColorArr.value[notesColorCurrentIndex.value],
    time: new Date(),
  };
  let res: AddNotesResponseData = await reqAddNotes(notesData);
  if (res.status === 200) {
    const { _id, imgUrl, nick } = userInfoStore.userInfo;
    let addData: NotesResponseData = {
      userId: {
        _id: _id,
        imgUrl: imgUrl,
        nick: nick,
      },
      text: notesText.value,
      color: notesColorArr.value[notesColorCurrentIndex.value],
      time: formatTime(new Date()),
      _id: res._id,
    };
    notesList.value.unshift(addData);
    cancelClick();
    ElMessage({
      message: res.msg,
      type: 'success',
    });
  } else {
    ElMessage.error(res.msg);
  }
};

// 删除便签的回调
const handleConfirm = async (id: string) => {
  let res: DelNotesResponseData = await reqDelNotes(id);
  if (res.status === 200) {
    $router.go(0);
    ElMessage({
      message: res.msg,
      type: 'success',
    });
  } else {
    ElMessage.error(res.msg);
  }
};
</script>

<style scoped lang="scss">
.notes-content {
  width: 100%;
  height: 100%;
  background-color: var(--light-background-color);
  display: flex;
  justify-content: center;
  position: relative;
}

.confetti {
  max-width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  user-select: none;
  opacity: 0.7;
}

.notes-list {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .notes-item {
    width: 25%;
    height: 300px;
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;

    .card {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-radius: 10px;

      .info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .user-pic {
          width: 35px;
          height: 35px;
          background-color: orange;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .nick {
          flex: 1;
        }
      }

      .text {
        flex: 1;
        line-height: 20px;
        overflow: auto;
        margin-bottom: 10px;
      }

      .time {
        margin-left: auto;
        font-size: 13px;
        color: #535353;
      }
    }
  }

  .loading-more {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 60px;
    color: #535353;
    cursor: pointer;
    font-size: 15px;
  }
  .loading-icon {
    margin-left: 2px;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

.release-btn {
  width: 50px;
  height: 50px;
  background-color: var(--btn-bg);
  border-radius: 50%;
  overflow: hidden;
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translateX(25%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
.pop-item {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}

.notes-choose-color {
  margin-top: 15px;

  .color-title {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .color-list {
    width: 100%;
    display: flex;
    align-items: center;

    .color-item {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
<style>
.el-drawer__header {
  display: none;
}
.el-popconfirm {
  padding: 10px;
}
</style>
