<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0" @click="toIndexPage">首页</el-menu-item>
    <el-menu-item index="1" @click="toAddBlog">添加文章</el-menu-item>
    <el-menu-item index="2" @click="toTagManage">标签</el-menu-item>
    <el-menu-item index="3" @click="toTransfile">文件传输</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="toBlogManage">个人空间</el-menu-item>
  </el-menu>
</template>

<script setup>
import router from '@/router'

const toIndexPage = () => {
  router.push({ path: '/'})
}

const toAddBlog = () => {
  router.push({ path: '/manage/addblog' })
}

const toTagManage = () => {
  router.push({ path: '/manage/tag'})
}

const toTransfile = () => {
  router.push({ path: '/transfile'})
}

const toBlogManage = () => {
  router.push({ path: '/manage' })
}

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>