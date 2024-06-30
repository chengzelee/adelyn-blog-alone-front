<template>
  <el-row class="el-row-bottom-space" :gutter="12" align="middle" justify="center">
    <el-col :span="8">
      <el-input
          v-model="searchString"
          class="w-50 m-2"
          size="large"
          placeholder="search"
          @keyup.enter="searchUserBlog"
          :prefix-icon="Search"
      />
    </el-col>
    <el-col :span="2">
      <el-button type="primary" :icon="Search" @click="searchUserBlog">Search</el-button>
    </el-col>
  </el-row>
  <el-row v-loading="loading" align="middle" justify="center">
    <el-col :span="24">
      <div v-for="blog in blogList" :key="blog.blogId">
        <el-row :gutter="12" align="middle" justify="center">
          <el-col :span="12">
            <el-card class="card-box" shadow="hover" @click="blogContent(blog.blogId)">
              <div class="card-head">
                <div v-html="blog.blogTitle"/>
              </div>
              <div class="card-body">
                <el-text truncated><div v-html="blog.blogContent"/></el-text>
              </div>
              <div class="card-body">
                <el-tag
                    v-for="tag in blog.blogTagList"
                    :key="tag.tagId"
                    class="mx-1 tag-box"
                    :type="''"
                    effect="light"
                >
                  {{ tag.tagName }}
                </el-tag>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import * as searchApi from '@/api/common/search.js'
import * as blogManageApi from '@/api/blogmanage/blog.js'
import {useRouter} from "vue-router";

const searchString = ref('')
const isSearch = ref(false)

onMounted(() => {
  isSearch.value = false
  getPage()
})

const blogList = ref([])
const pagination = ref()

const loading = ref(true)

const getPage = () => {
  loading.value = true
  if (isSearch.value) {
    searchUserBlog()
  } else {
    const router = useRouter()
    let blogTagId
    if (router != null) {
      blogTagId = router.currentRoute.value.query.blogTagId
    }

    let page = {
      pageNum: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
      pageOrderList : [
        {
          "column": "updateTime",
          "asc": false
        }
      ]
    }

    let blogQueryDTO = {
      blogTagId: blogTagId,
      pageDTO: page
    }

    blogManageApi.getPage(blogQueryDTO).then(
        (res) => {
          pagination.value.totalCount = res.total
          blogList.value = res.list

          loading.value = false
        }
    )
  }
}

const searchUserBlog = () => {
  let searchBlogDTO = {
    from: pagination.value.currentPage,
    size: pagination.value.pageSize,
    queryStr: searchString.value
  }

  searchApi.searchUserBlog(searchBlogDTO).then(
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
  ElMessageBox.confirm(
      '确认要删除嘛？',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        blogManageApi.deleteBlog({ blogId: blogId }).then(
            () => {
              ElMessage({
                type: 'success',
                message: '成功删除',
              })
              getPage()
            }
        )
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}
</script>

<style scoped>
.el-row-bottom-space {
  margin-bottom: 10px;
}
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

.tag-box {
  margin-right: 10px;
}
</style>
