<template>
    <div>
        <video ref="video"></video>
        <button @click="handleClick">点击</button>
        <button @click="handleClose">关闭</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const video = ref<HTMLVideoElement>()
const streams = ref()
const handleClick = async () => {
    streams.value = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            document.querySelector('video')!.srcObject = stream
            document.querySelector('video')!.play()
        })
        .catch((err) => {
            console.error(err)
        })
}

const handleClose = () => {
    document.querySelector('video')!.srcObject = null
}
</script>

<style scoped lang="scss">
video {
    width: 400px;
    height: 200px;
    border: 1px solid #000;
}
</style>