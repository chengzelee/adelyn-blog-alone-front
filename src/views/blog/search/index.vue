<template>
  <el-row :gutter="10" align="middle" justify="center">
    <el-col :span="8">
      <el-input
          v-model="searchString"
          class="w-50 m-2"
          size="large"
          placeholder="search"
          :prefix-icon="Search"
      />
    </el-col>
    <el-col :span="1">
      <el-button type="primary" :icon="Search">Search</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchString = ref('')
</script>

<style scoped>
</style>