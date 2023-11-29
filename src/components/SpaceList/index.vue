<template>
  <div class="drag-wrap drag"></div>
  <!-- 动态列表 -->
  <div class="list" ref="list" v-if="spaceList.length">
    <div class="space-item" v-for="(item, index) in spaceList" :key="index"
      :class="$route.path === '/space' ? 'is-space' : 'is-contact'">
      <!-- 动态时间 -->
      <div class="space-time">
        <div class="year">{{ year(item.time) }}</div>
        <div class="month">{{ month(item.time) }}</div>
        <div class="day">{{ day(item.time) }}</div>
      </div>
      <!-- 动态容器 -->
      <div class="space-info">
        <!-- 用户头像、昵称 -->
        <div class="user-info">
          <div class="user-pic">
            <img :src="proxy.$baseUrl + item.userId.imgUrl" alt="" />
          </div>
          <div class="user-nick">{{ item.userId.nick }}</div>
        </div>
        <!-- 动态内容 -->
        <div class="space-content">
          <!-- 文字 -->
          <div class="space-text">{{ item.textDesc }}</div>
          <!-- 图片 -->
          <div class="space-img-list">
            <div class="demo-image__preview" v-for="(i, k) in item.photos" :key="k" @click="imgDetail(item?.photos, k)">
              <el-image style="width: 150px; height: 150px" :src="proxy.$baseUrl + i" :zoom-rate="1.2" fit="cover">
                <template #error>
                  <div class="image-slot">
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
          <!-- 点赞、删除图标 -->
          <div class="bottom-icon" v-if="$route.path === '/space'">
            <div class="space-detail-time">{{ hour(item.time) }}:{{ min(item.time) }}</div>
            <div class="like-icon" v-if="!item.isLike" @click="changeLoveIcon(item._id, item)">
              <svg t="1694533305318" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="7246" width="20" height="20">
                <path
                  d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                  p-id="7247"></path>
              </svg>
            </div>
            <div class="like-icon" v-else @click="changeLoveIcon(item._id, item)">
              <svg t="1694533458750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="9389" width="20" height="20">
                <path
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                  p-id="9390" fill="#0091ff"></path>
              </svg>
            </div>
            <div v-if="item.userId._id === userInfoStore.userInfo._id" @click="open(item._id, index)">
              <svg t="1694684152179" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4935" width="20" height="20">
                <path
                  d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
                  p-id="4936"></path>
                <path
                  d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
                  p-id="4937"></path>
                <path
                  d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
                  p-id="4938"></path>
                <path
                  d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
                  p-id="4939"></path>
              </svg>
            </div>
          </div>
          <!-- 分割线 -->
          <el-divider v-if="$route.path === '/space'"/>
        </div>
        <div v-if="$route.path === '/space'">
          <!-- 点赞列表 -->
          <div class="like-list" v-if="item.likeList.length">
            <div class="like-icon">
              <svg t="1694533458750" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="9389" width="15" height="15">
                <path
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
                  p-id="9390" fill="#0091ff"></path>
              </svg>
            </div>
            <div class="like-item" v-for="(i, k) in item.likeList" :key="k">
              <span class="user-nick">{{ i.userId.nick }}</span>
              <span v-if="k != item.likeList.length - 1">、</span>
            </div>
            <div class="like-all-people">{{ item.likeList.length }}人觉得很赞</div>
          </div>
          <!-- 评论列表 -->
          <div class="space-comment-list" v-if="!false">
            <div class="space-comment-item" v-for="(i, k) in item.commentList" :key="k">
              <!-- 评论容器 -->
              <div class="space-comment-content">
                <!-- state: 0发布评论  1回复评论 -->
                <div class="user-pic">
                  <img :src="proxy.$baseUrl + i.userId.imgUrl" alt="">
                </div>
                <div class="reply-user-info">
                  <span class="reply-nick">{{ i.userId.nick }}
                    <span style="margin: 0 3px 0 0;">:</span>
                  </span>
                  <span class="reply-text">{{ i.textarea }}</span>
                  <div class="reply-time">{{ month(i.time) }}{{ day(i.time) }}日 {{ hour(i.time) }}:{{ min(i.time) }}
                    <span @click="handleReply(item, i)">回复</span>
                    <span @click="delSpaceComment(i, 0)" v-if="i.userId._id === userInfoStore.userInfo._id">删除</span>
                  </div>
                </div>
              </div>
              <!-- 评论回复容器 -->
              <div class="space-comment-reply-content">
                <div v-for="(i2, k2) in item.replyList" :key="k2">
                  <div v-if="k2 === k && i2.length !== 0">
                    <div class="space-comment-reply-item" v-for="(i3, k3) in i2" :key="k3">
                      <div class="user-pic">
                        <img :src="proxy.$baseUrl + i3.userId.imgUrl" alt="">
                      </div>
                      <div class="reply-user-info">
                        <span class="reply-nick">
                          {{ i3.fromId.nick }} <span style="color: #000;">回复</span> {{ i3.toId.nick }}
                          <span style="margin: 0 3px 0 0;">:</span>
                        </span>
                        <span class="reply-text">
                          {{ i3.textarea }}
                        </span>
                        <div class="reply-time">
                          {{ month(i3.time) }}{{ day(i3.time) }}日 {{ hour(i3.time) }}:{{ min(i3.time) }}
                          <span @click="handleReply(item, i)">回复</span>
                          <span @click="delSpaceComment(i3, 1)"
                            v-if="i3.userId._id === userInfoStore.userInfo._id">删除</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 评论输入框 -->
          <div style="display: flex;align-items: flex-end;">
            <el-input v-model="item.textarea" autosize type="textarea" :placeholder="item.placeholder" maxlength="100"
              show-word-limit @blur="handleBlur(item)" />
            <el-button type="primary" text bg style="margin-left: 10px;"
              @click="sendComment(item, item.iptType)">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="list no-data" ref="list" v-else-if="!spaceList.length && !showSkeleton">
    <img src="@/assets/images/no_space.png" alt="">
    <div class="no-data-title">空间什么也没有呢</div>
  </div>
  <div class="list" v-if="showSkeleton" ref="list" style="padding: 20px 20px 0;box-sizing: border-box;">
    <el-skeleton :rows="5" animated style="margin-bottom: 30px;" v-for="el in 3" :key="el" />
  </div>
  <!-- 上传图片预览 -->
  <el-image-viewer v-if="showPreviewImg" :url-list="urlList" :initial-index="initialIndex" @close="closePreviewImg" />
</template>

<script setup lang="ts">
import { watch, ref, getCurrentInstance, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Picture } from "@element-plus/icons-vue"
// api
import { reqSpaceLike, reqAddSpaceComment, reqDelSpaceComment, reqDelSpace } from '@/api/space/index'
// 引入ts类型
import type { Spaces, Space, SpaceLikeResponseData, SpaceCommentResponseData, DelSpaceCommentResponseData, DelSpaceResponseData } from "@/api/space/type"
// route
import { useRoute } from "vue-router"
// pinia
import { useUserInfoStore } from '@/store/modules/user'
// 引入时间转换函数
// @ts-ignore
import { year, month, day, hour, min } from "@/utils/spaceTime"
// baseUrl
const { proxy } = getCurrentInstance() as any
// route
const $route = useRoute()
// pinia仓库
const userInfoStore = useUserInfoStore()

// 接收父组件动态列表的容器
let spaceList = ref<Spaces>([])
const props = defineProps(["spaceDataList", "showSkeleton"])
const $emit = defineEmits(['commentRefresh'])

// 控制骨架屏的显示
const showSkeleton = ref<boolean>(true)

watch(
  () => props.spaceDataList,
  (val) => {
    spaceList = val
    showSkeleton.value = false
    nextTick(() => {
      if (!list.value) return
      list.value.scrollTop = localStorage.getItem('spaceScrollTop') ? Number(localStorage.getItem('spaceScrollTop')) : 0
      localStorage.removeItem('spaceScrollTop')
    })
  }
)

// 图片预览列表
let urlList = ref<string[]>([])
// 点击图片的下标
let initialIndex = ref<number>(0)
// 图片预览的显示或隐藏
const showPreviewImg = ref<boolean>(false)

// 点击展示图片详情回调
const imgDetail = (photos: string[], k: number) => {
  showPreviewImg.value = true
  photos.forEach(i => {
    urlList.value.push(proxy.$baseUrl + i)
  })
  initialIndex.value = k
}

// 图片预览关闭回调
const closePreviewImg = () => {
  urlList.value = []
  showPreviewImg.value = false
}

// 切换点赞的回调
const changeLoveIcon = async (spaceId: string, item: any) => {
  let res: SpaceLikeResponseData = await reqSpaceLike({ userId: userInfoStore.userInfo._id, spaceId })
  if (res.status === 200) {
    item.isLike = !item.isLike
    if (item.isLike) {
      item.likeList.push({
        userId: {
          _id: userInfoStore.userInfo._id,
          nick: userInfoStore.userInfo.nick
        }
      })
    } else {
      item.likeList.forEach((i: any, k: number) => {
        if (i.userId._id === userInfoStore.userInfo._id) {
          item.likeList.splice(k, 1)
        }
      })
    }
  }
}

let list = ref()

// 发布评论按钮回调
const sendComment = async (item: Space, type: number) => {
  if (!item.textarea) {
    return ElMessage({
      type: 'warning',
      message: '评论不能为空'
    })
  }
  const { _id } = userInfoStore.userInfo
  // 评论类型(0 => 自己评论, 1 => 回复评论)
  if (type === 0) {
    let data = {
      spaceId: item._id,
      userId: _id,
      fromId: _id,
      toId: _id,
      textarea: item.textarea
    }
    let res: SpaceCommentResponseData = await reqAddSpaceComment(0, data)
    if (res.status === 200) {
      item.textarea = ''
      localStorage.setItem('spaceScrollTop', list.value.scrollTop)
      $emit('commentRefresh')
    } else {
      return ElMessage.error(res.msg)
    }
  } else {
    let data = {
      spaceId: item._id,
      spaceCommentId: item.spaceCommentId,
      userId: _id,
      fromId: _id,
      toId: item.iptToId,
      textarea: item.textarea
    }
    let res: SpaceCommentResponseData = await reqAddSpaceComment(1, data)
    if (res.status === 200) {
      item.textarea = ''
      localStorage.setItem('spaceScrollTop', list.value.scrollTop)
      $emit('commentRefresh')
    } else {
      return ElMessage.error(res.msg)
    }
  }
}

// 点击回复按钮的回调
const handleReply = (item: Space, i: any) => {
  item.placeholder = '回复评论'
  item.iptType = 1
  item.iptToId = i.toId
  item.spaceCommentId = i._id
}

// 输入框失去焦点回调
const handleBlur = (item: Space) => {
  if (!item.textarea) {
    item.placeholder = '评论'
    item.iptType = 0
    item.iptToId = userInfoStore.userInfo._id
  }
}

// 评论删除回调
const delSpaceComment = async (item: any, type: number) => {
  let res: DelSpaceCommentResponseData = await reqDelSpaceComment(type, item._id)
  if (res.status === 200) {
    localStorage.setItem('spaceScrollTop', list.value.scrollTop)
    $emit('commentRefresh')
  } else {
    ElMessage.error(res.msg)
  }
}

const open = (_id: string, index: number) => {
  ElMessageBox.confirm(
    '你确定要删除该条动态吗?',
    '提示',
    {
      type: 'warning',
      distinguishCancelAndClose: true,
      confirmButtonText: '是滴',
      cancelButtonText: '我再想想',
    }
  )
    .then(async () => {
      // 确定回调
      let res: DelSpaceResponseData = await reqDelSpace(_id)
      if (res.status === 200) {
        ElMessage({
          type: 'success',
          message: res.msg
        })
        props.spaceDataList.splice(index, 1)
      } else {
        ElMessage.error(res.msg)
      }
    })
    .catch(() => {
      // 取消回调
    })
}
</script>

<style scoped lang="scss">
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
  }

  .no-data-title {
    font-size: 15px;
    color: #999;
  }
}

.list {
  width: 600px;
  background-color: #fff;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .space-item {
    display: flex;
    padding: 20px;
    box-sizing: border-box;

    .space-time {
      width: 40px;
      color: #9195a1;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .year,
      .month {
        height: 20px;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }

      .day {
        height: 30px;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
      }
    }

    .space-info {
      flex: 1;

      .user-info {
        display: flex;
        align-items: center;
        font-size: 15px;
        margin-bottom: 10px;

        .user-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .space-content {
        .space-text {
          font-size: 15px;
          line-height: 25px;
          word-break: break-all;
          padding-bottom: 10px;
        }

        .space-img-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .demo-image__preview {
            margin: 0 10px 10px 0;
          }
        }

        .bottom-icon {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 10px;

          .space-detail-time {
            margin-right: auto;
            font-size: 13.5px;
            color: #949494;
          }

          .icon {
            margin: 0 5px;
          }
        }
      }

      .like-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;

        .like-icon {
          height: 20px;
          margin-right: 5px;
        }

        .like-item,
        .like-all-people {
          font-size: 13.5px;
          line-height: 20px;
          color: #2057a2;
        }
      }
    }

    .space-comment-list {
      width: 100%;

      .space-comment-item {
        margin-bottom: 20px;

        // 评论容器
        .space-comment-content {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }

        // 回复容器
        .space-comment-reply-content {
          padding-left: 50px;
          box-sizing: border-box;
          margin-bottom: 30px;

          .space-comment-reply-item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }
        }

        .user-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .reply-user-info {
          position: relative;
          font-size: 13.5px;
          flex: 1;
          line-height: 20px;

          &:hover {
            .reply-time {
              span {
                display: inline-block;
              }
            }
          }

          .reply-nick {
            font-size: 15px;
            color: #2057a2;
          }

          .reply-text {
            font-size: 15px;
          }

          .reply-time {
            position: absolute;
            bottom: -20px;
            color: #949494;

            span {
              margin-left: 5px;
              display: none;

              &:hover {
                color: #0091ff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .is-space {
    border-bottom: 20px solid #f8f8f8;
  }

  .is-contact {
    margin-bottom: 20px;
  }
}</style>