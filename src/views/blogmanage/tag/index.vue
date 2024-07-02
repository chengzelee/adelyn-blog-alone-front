<template>
  <el-row class="el-row-bottom-space" :gutter="12" align="middle" justify="center">
    <el-col :span="8">
      <el-input
          v-model="tagName"
          class="w-50 m-2"
          size="large"
      />
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="saveTag">添加</el-button>
    </el-col>
  </el-row>
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-for="tag in tagList" :key="tag.tagId">
        <el-row :gutter="12" align="middle" justify="center">
          <el-col :span="12">
            <el-card class="card-box" shadow="hover" @click="tagBlogs(tag.tagId)">
              <div class="card-body">
                <el-text><h2>{{ tag.tagName }}</h2></el-text>
              </div>
              <div class="card-body">
                <el-tag
                    class="mx-1 tag-box"
                    :type="''"
                    effect="light"
                >
                  {{ tag.tagBlogNum }} 篇
                </el-tag>
              </div>
            </el-card>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="tagEditForm(tag.tagId, tag.tagName)">编辑</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="danger" @click="deleteTag(tag.tagId)">删除</el-button>
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

  <el-dialog v-model="tagEditFormVisible" title="tag">
    <el-form>
      <el-form-item label="tag name" :label-width="formLabelWidth">
        <el-input v-model="tagName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="tagEditFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTag">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'
import { ref, onMounted } from 'vue'
import * as tagApi from '@/api/blogmanage/tag.js'
import router from "../../../router";

onMounted(() => {
  getPage()
})

const tagList = ref([]);
const pagination = ref()

const getPage = () => {
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

  tagApi.getPageWithBlogNum({pageDTO: page} ).then(
      (res) => {
        pagination.value.totalCount = res.total
        tagList.value = res.list
      }
  )
}

const tagId = ref()
const tagName = ref()
const tagEditFormVisible = ref(false)
const formLabelWidth = '140px'

const tagEditForm = (id, name) => {
  tagEditFormVisible.value = true

  tagId.value = id
  tagName.value = name
}

const saveTag = () => {
  if (tagId.value == null) {
    tagApi.saveTag({ tagName: tagName.value }).then(
        () => {
          getPage()
          tagName.value = ''
          tagEditFormVisible.value = false
        }
    )
  } else {
    tagApi.updateTag({ tagId: tagId.value, tagName: tagName.value}).then(
        () => {
          getPage()
          tagName.value = ''
          tagEditFormVisible.value = false
        }
    )
  }
}

const deleteTag = (tagId) => {
  tagApi.deleteTag( [tagId] ).then(
      () => {
        getPage()
      }
  )
}

const tagBlogs = (tagId) => {
  router.push({
    path: '/manage',
    query: {
      blogTagId: tagId
    }
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

.card-body {
  margin-top: 5px;
  font-size: 14px;
}
</style>
