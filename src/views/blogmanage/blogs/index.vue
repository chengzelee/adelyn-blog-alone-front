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
      <el-button type="primary" :icon="Search" @click="searchUserBlog">Search</el-button>
    </el-col>
  </el-row>
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-for="blog in blogList" :key="blog.blogId">
        <el-row align="middle" justify="center">
          <el-col :span="12">
            <el-card class="card-box" shadow="hover" @click="blogContent(blog.blogId)">
              <div class="card-head">{{blog.blogTitle}}</div>
              <div class="card-body">
                <el-text truncated><p>aaa</p></el-text>
              </div>
            </el-card>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="editBlog(blog.blogId)">编辑</el-button>
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
import { Search } from '@element-plus/icons-vue'
import * as blogManageApi from '@/api/blogmanage/blog.js'

const searchString = ref('')

onMounted(() => {
  getPage()
})

const blogList = ref([]);
const pagination = ref()

const getPage = () => {
  let page = {
    pageNum: pagination.value.currentPage,
    pageSize: pagination.value.pageSize
  }

  blogManageApi.getPage({ pageDTO: page }).then(
      (res) => {
        pagination.value.totalCount = res.total
        blogList.value = res.list
      }
  )
}

const blogContent = (blogId) => {
  router.push({
    path: '/blogContent',
    query: {
      blogId: blogId
    }
  })
}

const editBlog = (blogId) => {
  router.push({
    path: '/manage/addblog',
    query: {
      blogId: blogId
    }
  })
}

const deleteBlog = (blogId) => {
  blogManageApi.deleteBlog({ blogId: blogId}).then(
      (res) => {
        getPage()
      }
  )
}
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
