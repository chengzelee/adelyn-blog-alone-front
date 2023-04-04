<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">Adelyn</el-menu-item>
    <el-menu-item index="1">添加文章</el-menu-item>
    <el-menu-item index="2">tags</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">个人空间</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>