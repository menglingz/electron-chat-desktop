<template>
  <ul class="list-content">
    <!-- listType => 0 好友  1 => 群聊 -->
    <template v-if="list.length">
      <li class="list-item" v-for="(item, index) in list" :key="index"
        :class="listCurrentIndex === index && !showClose ? 'active' : ''" @click="changeContactItem(item._id, index)">
        <div class="warp">
          <div class="user-img">
            <img :src="proxy.$baseUrl + item.imgUrl" alt="" />
          </div>
          <div class="user-info" v-if="props.listType == 0">
            <div class="nick">{{ item.nick }}</div>
            <div class="sign">{{ item.sign }}</div>
          </div>
          <div class="group-info" v-else>
            <div class="name">{{ item.groupName }}</div>
          </div>
        </div>
      </li>
    </template>
    <template v-else>
      <div class="no-contact">
        <img src="@/assets/images/no_contact.png" alt="">
      </div>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from "vue"
// 全局事件总线
import $bus from "@/utils/eventBus"
// baseUrl
const { proxy } = getCurrentInstance() as any

const props = defineProps(["dataList", "listType", "showClose"])
const $emit = defineEmits(['changeRightComponent'])

const list = ref<any>([])

watch(() => props.dataList, (e) => {
  listCurrentIndex.value = -1
  list.value = e
})

// 当前选中的聊天下标
let listCurrentIndex = ref<number>(-1)

// 切换高亮显示
const changeContactItem = (id: string, index: number) => {
  listCurrentIndex.value = index
  // 关闭默认组件
  if (listCurrentIndex.value !== -1) {
    $emit('changeRightComponent', 1)
  }
  // 主页信息
  $bus.emit('contactHomeInfo', { listType: props.listType, id })
}
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
      width: 220px;
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

      .user-info,
      .group-info {
        flex: 1;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 10px;
        box-sizing: border-box;

        .nick,
        .name {
          width: 170px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 15px;
        }

        .sign {
          width: 170px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #8c8c8c;
        }
      }

      .dots {
        width: 18px;
        height: 18px;
        background-color: red;
        border-radius: 50%;
        overflow: hidden;
        font-size: 12px;
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