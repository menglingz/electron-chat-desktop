<template>
  <div>
    <button @click="enabled = !enabled">
      {{ enabled ? 'Stop' : 'Start' }}
    </button>
  </div>

  <div>
    <div
      v-for="camera of cameras"
      :key="camera.deviceId"
      class="px-2 py-1 cursor-pointer"
      :class="{ 'text-primary': currentCamera === camera.deviceId }"
      @click="currentCamera = camera.deviceId"
    >
      {{ camera.label }}
    </div>
  </div>
  <div>
    <video ref="video" muted autoplay controls class="h-100 w-auto" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useDevicesList, useUserMedia } from '@vueuse/core';

const currentCamera = ref<string>();
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value)) currentCamera.value = cameras.value[0]?.deviceId;
  },
});

const video = ref<HTMLVideoElement>();
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } as any },
});

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!;
});
</script>

<style scoped lang="scss">
video {
  width: 100%;
  height: 90vh;
  border: 1px solid red;
}
</style>
