<template>
  <div class="container">
    <div class="top-icon">
      <!-- emoji图标 -->
      <el-popover
        placement="top-end"
        trigger="click"
        width="450"
        @hide="
          emojiActive = false;
          emojiFlag = false;
        "
      >
        <template #reference>
          <div
            class="icon-box"
            @click="handleEmoji"
            @mouseover="emojiActive = true"
            @mouseout="emojiFlag ? '' : (emojiActive = false)"
          >
            <svg
              t="1690621072710"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="30103"
              width="25"
              height="25"
            >
              <path
                d="M515.328 965.2224c-249.9072 0-453.2224-203.3152-453.2224-453.2224s203.3152-453.2224 453.2224-453.2224 453.2224 203.3152 453.2224 453.2224-203.3152 453.2224-453.2224 453.2224z m0-845.0048c-216.0128 0-391.7824 175.7696-391.7824 391.7824s175.7696 391.7824 391.7824 391.7824 391.7824-175.7696 391.7824-391.7824-175.7696-391.7824-391.7824-391.7824z"
                :fill="emojiActive ? '#50abf8' : '#4F4F4F'"
                p-id="30105"
              ></path>
              <path
                d="M385.8944 409.4976m-53.6064 0a53.6064 53.6064 0 1 0 107.2128 0 53.6064 53.6064 0 1 0-107.2128 0Z"
                :fill="emojiActive ? '#50abf8' : '#4F4F4F'"
                p-id="30106"
              ></path>
              <path
                d="M636.8768 409.4976m-53.6064 0a53.6064 53.6064 0 1 0 107.2128 0 53.6064 53.6064 0 1 0-107.2128 0Z"
                :fill="emojiActive ? '#50abf8' : '#4F4F4F'"
                p-id="30107"
              ></path>
              <path
                d="M510.208 708.1984c-122.88 0-183.7568-103.1168-186.3168-107.52a30.72 30.72 0 0 1 53.1456-30.8224c1.9968 3.3792 46.4896 76.9024 133.1712 76.9024 86.784 0 131.328-73.7792 133.1712-76.9024a30.78144 30.78144 0 0 1 41.984-11.008 30.6688 30.6688 0 0 1 11.1616 41.8304c-2.56 4.352-63.488 107.52-186.3168 107.52z"
                :fill="emojiActive ? '#50abf8' : '#4F4F4F'"
                p-id="30108"
              ></path>
            </svg>
          </div>
        </template>
        <Emoji :history-emoji-list="historyEmojiList" @selectEmoji="selectEmoji" />
      </el-popover>
      <!-- 代码图标 -->
      <div
        class="icon-box"
        @click="markDownEditVisible = true"
        @mouseover="codeActive = true"
        @mouseout="codeFlag ? '' : (codeActive = false)"
      >
        <svg
          t="1697711908249"
          class="icon"
          viewBox="0 0 1027 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4068"
          width="25"
          height="25"
        >
          <path
            d="M321.828571 226.742857c-14.628571-14.628571-36.571429-14.628571-51.2 0L7.314286 482.742857c-14.628571 14.628571-14.628571 36.571429 0 51.2l256 256c14.628571 14.628571 36.571429 14.628571 51.2 0 14.628571-14.628571 14.628571-36.571429 0-51.2L87.771429 512l234.057142-234.057143c7.314286-14.628571 7.314286-36.571429 0-51.2z m263.314286 0c-14.628571 0-36.571429 7.314286-43.885714 29.257143l-131.657143 497.371429c-7.314286 21.942857 7.314286 36.571429 29.257143 43.885714s36.571429-7.314286 43.885714-29.257143l131.657143-497.371429c7.314286-14.628571-7.314286-36.571429-29.257143-43.885714z m431.542857 256l-256-256c-14.628571-14.628571-36.571429-14.628571-51.2 0-14.628571 14.628571-14.628571 36.571429 0 51.2L936.228571 512l-234.057142 234.057143c-14.628571 14.628571-14.628571 36.571429 0 51.2 14.628571 14.628571 36.571429 14.628571 51.2 0l256-256c14.628571-14.628571 14.628571-43.885714 7.314285-58.514286z"
            :fill="codeActive ? '#50abf8' : '#4F4F4F'"
            p-id="4069"
          ></path>
        </svg>
      </div>
      <MarkDownEdit
        :mark-down-edit-visible="markDownEditVisible"
        @handleMarkDownEditVisible="handleMarkDownEditVisible"
      />
      <!-- 文件图标 -->
      <el-upload
        multiple
        :limit="9"
        :show-file-list="false"
        :on-exceed="handleExceed"
        :on-error="handleUploadError"
        :http-request="handleFileUpload"
      >
        <div class="icon-box" @mouseover="fileActive = true" @mouseout="fileFlag ? '' : (fileActive = false)">
          <svg
            t="1693530828320"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5800"
            width="25"
            height="25"
          >
            <path
              d="M506 894.2a33 32.9 0 1 0 66 0 33 32.9 0 1 0-66 0Z"
              :fill="fileActive ? '#50abf8' : '#4F4F4F'"
              p-id="5801"
            ></path>
            <path
              d="M864 388.7v-4.4c0-70.7-57.3-128-128-128H511.8l-82.5-110.9c-7.4-12.9-18-16.2-27.3-16l-0.1-0.1H192.1c-70.7 0-128 57.3-128 128v542.1c0 70.7 57.3 128 128 128H407v-0.4c18.2 0 33-14.7 33-32.9s-14.8-32.9-33-32.9c-1 0-2.1 0.1-3.1 0.1h-181c-35.3 0-64-28.7-64-64 0-5.5 0.7-10.9 2-16L234 498.9l0.2-0.1c6.7-28.1 31.9-49 62.1-49.1l0.2-0.1h532.2c1.3-0.1 2.5-0.1 3.8-0.1 35.3 0 64 28.7 64 64 0 6.7-1.1 13.3-3 19.4v0.1L821 812.8c-0.1 0.6-0.3 1.1-0.4 1.7l-1.5 5.8-0.5 0.4c-1.5 3.9-3.4 7.5-5.5 11h-1.3c-2.6 4.7-5.8 9.1-9.5 12.9-11.4 10.6-26.7 17.1-43.4 17.1-1.3 0-2.6 0-3.8-0.1h-80.8c-1-0.1-2.1-0.1-3.1-0.1-18.2 0-33 14.7-33 32.9s14.8 32.9 33 32.9v0.2H763l0.5-0.4c59.1-0.2 108.7-40.4 123.2-95l0.2-0.2 67.8-285.5c2.9-10.8 4.5-22.1 4.5-33.8-0.1-59.5-40.5-109.5-95.2-123.9z m-571.5-4.9c-62 0-113.7 44.2-125.5 102.7l-0.5 0.4-38 160.3V257c0-35.3 28.7-64 64-64H383l82.7 111.3c6.6 11.4 19.2 17.2 31.5 15.8h238.5c35.2 0 63.8 28.5 64 63.7H292.5z"
              :fill="fileActive ? '#50abf8' : '#4F4F4F'"
              p-id="5802"
            ></path>
          </svg>
        </div>
      </el-upload>
      <!-- 照片图标 -->
      <el-upload
        :action="proxy.$baseUrl + reqPrivateUploadPhotoUrl"
        name="photo"
        :show-file-list="false"
        multiple
        :limit="9"
        :on-exceed="handleExceed"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <div class="icon-box" @mouseover="photoActive = true" @mouseout="photoFlag ? '' : (photoActive = false)">
          <svg
            id="mx_n_1693545790410"
            t="1693545790407"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8736"
            width="26"
            height="26"
          >
            <path
              d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z"
              :fill="photoActive ? '#50abf8' : '#4F4F4F'"
              p-id="8737"
            ></path>
          </svg>
        </div>
      </el-upload>
    </div>
    <div
      id="message-input"
      ref="messageInputDom"
      contenteditable="true"
      spellcheck="false"
      autofocus
      @input="messageInput"
      @paste="handlePaste"
      @keydown.enter="inputKeyDown"
    ></div>
    <el-button
      color="#4a89fc"
      class="send-message-btn"
      @click="sendMessage"
      @mouseover="tips = true"
      @mouseout="tips = false"
    >
      发送
      <Transition>
        <div v-if="tips" class="tips">
          <div class="tip">Shift + Enter 换行</div>
          <div class="tip">Enter 回车</div>
        </div>
      </Transition>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import Emoji from '@/components/Emoji/index.vue';
import MarkDownEdit from '@/components/MarkDownEdit/index.vue';
import { onMounted, ref, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import type { UploadProps, UploadFile } from 'element-plus';
// Toast 轻提示组件
import Toast from '@/plugins/Toast';
// 清除复制的文本样式
import { handlePaste } from '@/utils/textFormat';
// 格式化事件
import { formatTime } from '@/utils/formatTime';
// 提取文件后缀名
import { extractExt } from '@/utils/extractExt';
// api
import { reqPrivateUploadPhotoUrl, reqUploadFile, reqMergeFile, reqVerifyHash } from '@/api/message/index';
import type { UploadPhotoResponseData } from '@/api/message/type';
// pinia
import { useUserInfoStore } from '@/store/modules/user';
import { useMessageStore } from '@/store/modules/message';
import type { MessageType } from '@/store/modules/interface/messageType';
// route
import { useRoute } from 'vue-router';
// md5
import SparkMD5 from 'spark-md5';
// pinia
const userInfoStore = useUserInfoStore();
const messageStore = useMessageStore();
// route
const $route = useRoute();
// baseUrl
const { proxy } = getCurrentInstance() as any;

const emit = defineEmits(['handleSendMessage']);

const message = ref<string>('');
const tips = ref<boolean>(false);

// 发送消息按钮回调
const sendMessage = () => {
  if (!message.value || message.value.length > 2000) {
    return Toast.show({ content: !message.value ? '消息不能为空' : '你的小作文别超过2000字' });
  }
  // 识别输入框的内容中是否带有链接
  const reg = /(http:\/\/|https:\/\/|www\.)((\w|=|\?|\.|\/|&|-)+)/g;
  const text = message.value;
  // 链接处理后的结果
  const message_res = text.replace(reg, (arg: string) => {
    let cur_str = arg;
    if (arg.indexOf('http') === -1 && arg.indexOf('https') === -1) {
      cur_str = 'http://' + arg;
    }
    return `<a href="${cur_str}" target="_blank" style="text-decoration: underline; cursor: pointer; color: inherit;">${arg}</a>`;
  });
  // 默认消息类型
  let msgType = 0;
  if (childNodes.value.length === 1 && childNodes.value[0].nodeName.toLowerCase() === 'img') {
    // 单个emoji 变为大图emoji (4为前后端约定的参数)
    msgType = 4;
    const imgTag = `<img src="${childNodes.value[0].getAttribute('src')}" width="65" height="65">`;
    emit('handleSendMessage', imgTag, msgType);
  } else {
    emit('handleSendMessage', message_res, msgType);
  }
  message.value = '';
  messageInputDom.value.innerHTML = '';
  messageInputDom.value.focus();
};

// input的keydown事件
const inputKeyDown = (e: any) => {
  if (e.shiftKey && e.keyCode === 13) {
    e.preventDefault();
    sendMessage();
  }
};

// emoji图标是否选中
const emojiActive = ref<boolean>(false);
// emoji组件是否打开
const emojiFlag = ref<boolean>(false);

// emoji组件展示
const handleEmoji = () => {
  emojiActive.value = true;
  emojiFlag.value = true;
};

// 自定义输入框子节点元素列表
const childNodes = ref<any>([]);

// 输入框input事件
const messageInput = (e: Event) => {
  childNodes.value = (e.target as HTMLInputElement).childNodes;
  message.value = (e.target as HTMLInputElement).innerHTML;
};

const messageInputDom = ref();
// 选择的emoji
const selectEmoji = (index: number) => {
  // 没有焦点就获取输入框焦点
  if (document.activeElement !== messageInputDom.value) {
    messageInputDom.value.focus();
  }
  const emojiImg = `<img src="./gif/${index}.gif" width="25" height="25" style="vertical-align: middle;">`;
  document.execCommand('insertHTML', false, emojiImg);
  // 保存最近使用的emoji
  recentlyUseEmoji(index);
};

// 最近使用的emoji列表
const historyEmojiList = ref<number[]>([]);

onMounted(() => {
  // 加载历史emoji
  historyEmojiList.value = localStorage.getItem('emojiHistory')
    ? JSON.parse(localStorage.getItem('emojiHistory') as string)
    : [];
});

// 保存最近使用的emoji
const recentlyUseEmoji = (index: number) => {
  const idx = historyEmojiList.value.indexOf(index);
  if (idx < 0) {
    historyEmojiList.value.unshift(index);
  } else {
    historyEmojiList.value.unshift(historyEmojiList.value.splice(idx, 1)[0]);
  }
  // 只要两行emoji(16个)
  historyEmojiList.value = historyEmojiList.value.splice(0, 16);
  // 保存记录
  localStorage.setItem('emojiHistory', JSON.stringify(historyEmojiList.value));
};

// emoji图标是否选中
const codeActive = ref<boolean>(false);
// emoji组件是否打开
const codeFlag = ref<boolean>(false);

// 控制markdown弹窗显示或隐藏
const markDownEditVisible = ref<boolean>(false);

// markdown组件的自定义事件
const handleMarkDownEditVisible = (val: boolean) => {
  markDownEditVisible.value = val;
};

// 文件(大文件)上传图标是否选中
const fileActive = ref<boolean>(false);
// 文件(大文件)上传组件是否打开
const fileFlag = ref<boolean>(false);

// 分片大小
const CHUNK_SIZE = 1024 * 1024; // 1mb

// 大文件上传回调
const handleFileUpload = async (rawFile: any) => {
  const file: File = rawFile.file;
  if (!file.size) {
    return ElMessage({
      type: 'warning',
      message: '文件空的哦!',
    });
  }
  // 文件名
  const fileName = file.name;
  // 文件后缀名
  const fileSuffixName = extractExt(fileName);
  // 消息类型
  let msgType = 3; // 文件消息类型为3
  let url = '';
  // 如果文件是图片/视频 图片 => 1 视频 => 2
  if (fileSuffixName === 'mp4' || fileSuffixName === 'mov') {
    // 获取视频第一帧
    const viodeBase64 = await getVideoCover(file);
    const videoInfo = {
      base64: viodeBase64 as string, // 封面图
      url: '', // 视频地址
    };
    url = JSON.stringify(videoInfo);
    msgType = 2;
  } else if (
    fileSuffixName === 'jpeg' ||
    fileSuffixName === 'png' ||
    fileSuffixName === 'jpg' ||
    fileSuffixName === 'gif'
  ) {
    try {
      url = (await readerFile(file)) as string;
      msgType = 1;
    } catch (error) {
      return ElMessage.error('图片上传失败, 请重新上传');
    }
  }
  const { _id, nick, imgUrl } = userInfoStore.userInfo;
  // 文件信息(与图片、视频无关)
  const fileInfo = {
    fileName,
    size: file.size,
    fileSuffixName,
    url: '', // 上传后的url
  };
  const data: MessageType = {
    userId: {
      _id,
      nick,
      imgUrl,
    },
    time: formatTime(new Date()),
    msgType, // 3为文件消息
    message: msgType === 3 ? JSON.stringify(fileInfo) : url,
    loading: true,
    progressNum: 0,
    uid: rawFile.file.uid,
  };
  messageStore.pushMessageData(data);
  // 文件分片
  const chunks = createChunks(file); // 获得文件切片数组
  // 计算文件hash 作为唯一标识
  const fileHash = await calculateHash(chunks);
  // 文件hash校验  (文件秒传 在上传文件前，就要把文件hash值告诉后端, 如果后端有该文件，直接返回上传成功)
  const res = await reqVerifyHash(
    { fileHash: fileHash as string, fileName },
    $route.query.type === 'friend' ? 'private' : 'group',
  );
  if (res.data.shouldUpload) {
    // 后端没有该文件, 上传分片
    uploadChunks(chunks, res.data.existChunks as string[], fileHash as string, fileName, file);
  } else {
    // 后端有该文件
    let replaceIndex: number | undefined;
    messageStore.messageChatList.forEach((item, index) => {
      // uid 上传每张图片的唯一标识
      if (item.uid === rawFile.file.uid) {
        replaceIndex = index;
      }
    });
    const data = messageStore.messageChatList[replaceIndex as number];
    const msgType = data.msgType;
    data.loading = false;
    data.progressNum = 100;
    let dataObj;
    let url = res.data.url;
    if (msgType === 3) {
      dataObj = JSON.parse(data.message);
      dataObj.url = url;
    } else if (msgType === 2) {
      const videoInfo = JSON.parse(data.message);
      videoInfo.url = res.data.url;
      url = JSON.stringify(videoInfo);
    } else {
      const scale = await imgScale(rawFile.file as File);
      const imgHeight = 200 / scale;
      url = JSON.stringify({
        url: res.data.url as string,
        height: imgHeight,
      });
    }
    data.message = (msgType === 3 ? JSON.stringify(dataObj) : url) as string;
    messageStore.updateMessageData(data, replaceIndex as number);
    // 发送者id
    const { _id } = userInfoStore.userInfo;
    // 接收者id
    const toId = $route.query.id;
    const type = $route.query.type;
    proxy.socket.emit(`${type === 'friend' ? 'private' : 'group'}_chat`, data, _id, toId);
  }
};

// 获取视频第一帧
const getVideoCover = (file: File) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
      const video = document.createElement('video');
      video.setAttribute('src', e.target.result);
      video.setAttribute('controls', 'controls');
      video.setAttribute('width', '260');
      video.setAttribute('height', '160');
      video.currentTime = 1; // 视频时长，一定要设置，不然大概率白屏
      video.addEventListener('loadeddata', function () {
        const canvas = document.createElement('canvas');
        const width = video.width;
        const height = video.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.drawImage(video, 0, 0, width, height); // 绘制canvas
        const dataURL = canvas.toDataURL('image/png'); // 转换为base64
        resolve(dataURL);
      });
    };
  });
};

// 文件切片
const createChunks = (file: File) => {
  const chunks = [];
  for (let i = 0; i < file.size; i += CHUNK_SIZE) {
    chunks.push(file.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};

// 计算文件hash
const calculateHash = (chunks: Blob[]) => {
  return new Promise(resolve => {
    // 首尾切片全部参与计算, 其余切片只计算首中尾两个字节
    const targets: Blob[] = []; // 存储所有参与计算的切片 blob数组
    // 循环产生新的分片数组
    chunks.forEach((chunk, index) => {
      if (index === 0 || index === chunks.length - 1) {
        // 首尾切片全部参与计算
        targets.push(chunk);
      } else {
        // 其余切片只计算首中尾两个字节
        targets.push(chunk.slice(0, 2)); // 前两个字节
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2)); // 中间两个字节
        targets.push(chunk.slice(CHUNK_SIZE - 2, CHUNK_SIZE)); // 最后两个字节
      }
    });

    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    // new Blob(targets) 将新分片数据转为blob对象
    fileReader.readAsArrayBuffer(new Blob(targets));
    // onload方法是异步的, 包裹Promise
    fileReader.onload = e => {
      spark.append((e.target as FileReader).result);
      // 返回拿到计算出来的hash值
      resolve(spark.end());
    };
  });
};

// 上传分片
const uploadChunks = async (
  chunks: Blob[],
  existChunks: string[],
  fileHash: string,
  fileName: string,
  rawFile: any,
) => {
  // dataObj [{fileHash: xxx, chunkHash: xxx, chunk}]
  const dataObj = chunks.map((chunk, index) => {
    // chunk 每个blob对象
    // 返回上传需要的数据
    return {
      fileHash, // 文件的hash: 区分上传的是哪个文件
      chunkHash: fileHash + '-' + index, // 切片的hash, 后端根据index来合并切片的
      chunk, // Blob对象
    };
  });

  // 每个切片都要有formData对象
  const formDatas = dataObj
    .filter(item => !existChunks.includes(item.chunkHash))
    .map(item => {
      const formData = new FormData();
      formData.append('fileHash', item.fileHash);
      formData.append('chunkHash', item.chunkHash);
      formData.append('chunk', item.chunk);
      return formData;
    });

  const max = 6; // 最大并发请求数
  const taskPool: any = []; // 请求池: 用来存放当前执行的请求 Promise数组
  let num = 0; // 上传成功的切片数量

  for (let i = 0; i < formDatas.length; i++) {
    const task = reqUploadFile(formDatas[i], $route.query.type === 'friend' ? 'private' : 'group');

    // 请求完成从请求池移除
    task.then(() => {
      num++;
      const fileObj: any = messageStore.messageChatList.filter(item => {
        return item.uid === rawFile.uid;
      });
      fileObj[0].progressNum = (Math.round((num / formDatas.length) * 100) / 100) * 100;
      taskPool.splice(taskPool.findIndex((item: any) => item === task));
    });

    taskPool.push(task); // 将每个请求放入请求池数组中

    // 请求池已经达到最大请求数, 需要等待请求池中要有完成的请求(完成一个就行)
    if (taskPool.length === max) {
      await Promise.race(taskPool); // 一个完成 promise状态为成功
    }
  }

  // 为了保证请求池中的请求全部完成
  await Promise.all(taskPool);

  // 全部完成后, 通知服务器去合并分片
  mergeRequest(fileHash, fileName, rawFile);
};

// 合并切片
const mergeRequest = async (fileHash: string, fileName: string, rawFile: any) => {
  const data = {
    fileHash,
    fileName,
    size: CHUNK_SIZE,
  };
  const res = await reqMergeFile(data, $route.query.type === 'friend' ? 'private' : 'group');
  let replaceIndex: number | undefined;
  messageStore.messageChatList.forEach((item, index) => {
    // uid 上传每张图片的唯一标识
    if (item.uid === rawFile.uid) {
      replaceIndex = index;
    }
  });
  if (res.status === 200) {
    // 合并成功, 向消息列表中push该条消息
    const data = messageStore.messageChatList[replaceIndex as number];
    const msgType = data.msgType;
    data.loading = false;
    let dataObj;
    let url = res.url;
    if (msgType === 3) {
      dataObj = JSON.parse(data.message);
      dataObj.url = url;
    } else if (msgType === 2) {
      const videoInfo = JSON.parse(data.message);
      videoInfo.url = res.url;
      url = JSON.stringify(videoInfo);
    } else {
      const scale = await imgScale(rawFile as File);
      const imgHeight = 200 / scale;
      url = JSON.stringify({
        url: res.url as string,
        height: imgHeight,
      });
    }
    data.message = (msgType === 3 ? JSON.stringify(dataObj) : url) as string;
    messageStore.updateMessageData(data, replaceIndex as number);
    // 发送者id
    const { _id } = userInfoStore.userInfo;
    // 接收者id
    const toId = $route.query.id;
    proxy.socket.emit(`${$route.query.type === 'friend' ? 'private' : 'group'}_chat`, data, _id, toId);
  } else {
    messageStore.delMessageData(replaceIndex as number);
    ElMessage.error('上传失败, 请重新上传');
  }
};

// 图片上传图标是否选中
const photoActive = ref<boolean>(false);
// 图片上传组件是否打开
const photoFlag = ref<boolean>(false);

// 图片上传前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = async rawFile => {
  // 文件类型和大小判断
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

  // 向自己消息列表中添加一条消息(本地图片图)
  try {
    // 文件读取成功
    const url = await readerFile(rawFile);
    const { _id, nick, imgUrl } = userInfoStore.userInfo;
    const data: MessageType = {
      userId: {
        _id,
        nick,
        imgUrl,
      },
      time: formatTime(new Date()),
      msgType: 1, // 1为图片消息
      message: url as string,
      loading: true,
      uid: rawFile.uid,
    };
    messageStore.pushMessageData(data);
    return true;
  } catch (error) {
    // 文件读取失败
    ElMessage.error('图片上传失败, 请重新上传');
    return false;
  }
};

// 读取本地文件
const readerFile = (file: File) => {
  return new Promise((resolve, reject) => {
    let fileUrl = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      fileUrl = e.target?.result as string;
      resolve(fileUrl);
    };
    reader.onerror = err => {
      reject(err);
    };
  });
};

// 文件超出限制的回调
const handleExceed = () => {
  ElMessage.error('图片最大只能上传9张哦');
};

// 图片上传失败回调
const handleUploadError: UploadProps['onError'] = () => {
  ElMessage.error('上传失败');
};

// 获取图片宽高比例
const imgScale = (file: File): Promise<number> => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img.width / img.height);
      URL.revokeObjectURL(img.src); // 释放URL对象引用
    };
  });
};

// 图片上传成功回调
const handleUploadSuccess: UploadProps['onSuccess'] = async (
  response: UploadPhotoResponseData,
  uploadFile: UploadFile,
) => {
  if (response.res_code === 200) {
    const scale = await imgScale(uploadFile.raw as File);
    const imgHeight = 200 / scale;
    // 向消息列表中push该条消息
    let replaceIndex: number | undefined;
    messageStore.messageChatList.forEach((item, index) => {
      // uid 上传每张图片的唯一标识
      if (item.uid === uploadFile.raw?.uid) {
        replaceIndex = index;
      }
    });
    const data = messageStore.messageChatList[replaceIndex as number];
    data.loading = false;
    data.message = JSON.stringify({
      url: response.url as string,
      height: imgHeight,
    });
    messageStore.updateMessageData(data, replaceIndex as number);
    // 发送者id
    const { _id } = userInfoStore.userInfo;
    // 接收者id
    const toId = $route.query.id;
    proxy.socket.emit(`${$route.query.type === 'friend' ? 'private' : 'group'}_chat`, data, _id, toId);
  } else {
    ElMessage.error(response.msg);
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.send-message-btn {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #fff;

  .tips {
    position: absolute;
    top: -60px;
    right: 0;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #909399;
    font-size: 13px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

    .tip {
      height: 20px;
      line-height: 20px;
    }
  }
}

.top-icon {
  width: 100%;
  display: flex;

  .icon-box {
    margin-right: 10px;
    cursor: pointer;
  }
}

#message-input {
  width: 100%;
  flex: 1;
  margin-top: 5px;
  box-sizing: border-box;
  resize: none;
  overflow: auto;

  &::placeholder {
    font-size: 15px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
