<template>
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-for="tag in tagList" :key="blog.blogId">
        <el-row align="middle" justify="center">
          <el-col :span="12">
            <el-card class="card-box" shadow="hover">
              <div class="card-head">
                <div v-html="blog.blogTitle"/>
              </div>
              <div class="card-body">
                <el-text truncated><div v-html="blog.blogContent"/></el-text>
              </div>
            </el-card>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="editTag(blog.blogId)">编辑</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="danger" @click="deleteBlog(blog.blogId)">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
  <el-row align="middle" justify="center">
    <el-col :span="3">
      <Pagination @getPage="getPage" ref="pagination"></Pagination>
    </el-col>
  </el-row>
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'
import {ref, onMounted } from 'vue'
import router from '@/router'


</script>

<style scoped>
.card-box {
  margin-bottom: 6px;
}

.card-head {
  font-size: 22px;
  font-weight: 400;
}

.card-body {
  margin-top: 5px;
  font-size: 14px;
}
</style>
