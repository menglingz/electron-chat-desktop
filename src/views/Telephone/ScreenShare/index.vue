<template>
  <div>
    <video src=""></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  a();
});

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
          maxHeight: 720,
        },
      } as any,
    });
    handleStream(stream);
  } catch (e) {
    handleError(e);
  }
}

function handleStream(stream: any) {
  const video = document.querySelector('video');
  (video as any).srcObject = stream;
  (video as any).onloadedmetadata = () => (video as any).play();
}

function handleError(e: any) {
  console.log(e);
}
</script>

<style scoped lang="scss">
video {
  width: 100%;
  height: 90vh;
  border: 1px solid reds;
}
</style>
