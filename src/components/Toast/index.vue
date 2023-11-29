<!-- Toast组件 -->
<template>
    <div class="toast" v-if="isShow">
        <div v-if="content" class="cont" :style="{ textAlign }">{{ content }}</div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const props = defineProps({
    // 内容
    content: {
        type: String,
        default: "成功"
    },
    // 显示时间，默认2s
    time: {
        type: Number,
        default: 2000,
    },
    // 对齐方式，默认center
    textAlign: {
        type: String,
        default: "center",
    }
})
// 弹窗显隐控制
const isShow = ref(false)
// 显示弹窗方法
const show = () => {
    isShow.value = true;
    if (props.time >= 0) {
        setTimeout(() => {
            hide()
        }, props.time)
    }
}
// 隐藏弹窗方法
const hide = () => {
    isShow.value = false
}

// 将显示弹窗方法暴露出去
defineExpose({
    show
})
</script>
<style lang="scss" scoped>
.toast {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background: rgb(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: 10px 20px;
    text-align: center;
    box-shadow: 0px 0px 2px #f1f1f1;

    .cont {
        font-size: 14px;
        color: #fff;
        line-height: 20px;
    }
}
</style>