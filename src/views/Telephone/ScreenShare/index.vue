<template>
    <div>
        <video src=""></video>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// 导入所需的模块
// 在 preload 脚本中。
const { ipcRenderer } = require('electron')

onMounted(() => {
    a()
})

async function a() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    // chromeMediaSourceId: sourceId,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                }
            }
        })
        handleStream(stream)
    } catch (e) {
        handleError(e)
    }
}

function handleStream(stream) {
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
}

function handleError(e) {
    console.log(e)
}
</script>

<style scoped lang="scss">
video {
    width: 100%;
    height: 90vh;
    border: 1px solid reds;
}
</style>