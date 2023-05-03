<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0" @click="toIndexPage">Adelyn</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="blogManage">个人空间</el-menu-item>
  </el-menu>
</template>

<script setup>
import router from '@/router'

const toIndexPage = () => {
  router.push({ path: '/'})
}

const blogManage = () => {
  router.push({ path: '/manage' })
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>