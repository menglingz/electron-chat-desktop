<template>
    <div class="btn-content no-drag">
        <!-- 最小化 -->
        <div class="btn" @click="handleMini">
            <svg t="1699103175218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1369" width="16" height="16">
                <path :fill="props.color"
                    d="M863.7 552.5H160.3c-10.6 0-19.2-8.6-19.2-19.2v-41.7c0-10.6 8.6-19.2 19.2-19.2h703.3c10.6 0 19.2 8.6 19.2 19.2v41.7c0 10.6-8.5 19.2-19.1 19.2z"
                    p-id="1370"></path>
            </svg>
        </div>
        <!-- 最大化 -->
        <div class="btn" @click="handleMax">
            <svg t="1699103468900" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1865" width="16" height="16">
                <path :fill="props.color"
                    d="M770.9 923.3H253.1c-83.8 0-151.9-68.2-151.9-151.9V253.6c0-83.8 68.2-151.9 151.9-151.9h517.8c83.8 0 151.9 68.2 151.9 151.9v517.8c0 83.8-68.1 151.9-151.9 151.9zM253.1 181.7c-39.7 0-71.9 32.3-71.9 71.9v517.8c0 39.7 32.3 71.9 71.9 71.9h517.8c39.7 0 71.9-32.3 71.9-71.9V253.6c0-39.7-32.3-71.9-71.9-71.9H253.1z"
                    p-id="1866"></path>
            </svg>
        </div>
        <!-- 关闭 -->
        <div class="btn" @click="handleClose">
            <svg t="1699103486197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="2121" width="16" height="16">
                <path :fill="props.color"
                    d="M897.6 183.5L183 898.1c-7.5 7.5-19.6 7.5-27.1 0l-29.5-29.5c-7.5-7.5-7.5-19.6 0-27.1L841 126.9c7.5-7.5 19.6-7.5 27.1 0l29.5 29.5c7.5 7.4 7.5 19.6 0 27.1z"
                    p-id="2122"></path>
                <path :fill="props.color"
                    d="M183 126.9l714.7 714.7c7.5 7.5 7.5 19.6 0 27.1l-29.5 29.5c-7.5 7.5-19.6 7.5-27.1 0L126.4 183.5c-7.5-7.5-7.5-19.6 0-27.1l29.5-29.5c7.4-7.5 19.6-7.5 27.1 0z"
                    p-id="2123"></path>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { maxWin } from '@/utils/maxWin'
const { ipcRenderer } = require('electron')

const props = defineProps(["color"])

// 最小化
const handleMini = () => {
    ipcRenderer.send('minWin')
}

// 最大化
const handleMax = () => {
    maxWin()
}

// 关闭
const handleClose = () => {
    ipcRenderer.send('close')
}
</script>

<style lang="scss" scoped>
.btn-content {
    height: 50px;
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    padding: 0 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .btn {
        height: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>