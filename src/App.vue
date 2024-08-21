<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import * as authApi from '@/api/common/auth.js'
import * as authUtil from '@/utils/auth.js'

onMounted(() => {
  setInterval(() => {
    if (authUtil.getRefreshToken().length === 0) {
      authApi.refreshAccessToken({ refreshToken: authUtil.getRefreshToken() }).then(
          (res) => {
            authUtil.setAccessToken(res.accessToken)
            authUtil.setRefreshToken(res.refreshToken)
          }
      )
    }
  }, 300000)
});

onUnmounted(() => {
  clearInterval(() => {
    authUtil.removeAllToken()
  });
});

</script>
