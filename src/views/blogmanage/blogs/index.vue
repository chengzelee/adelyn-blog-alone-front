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
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-for="o in 5" :key="o">
        <el-row gutter="6" align="middle" justify="center">
          <el-col :span="12">
            <el-card class="card-box" shadow="hover">
              <div class="card-head">head</div>
              <div class="card-body">
                <el-text truncated>Squeezed by parent elementtttttttttttttttttttttttttttttttttttttttt
                  ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                  tttttttttt
                </el-text>
              </div>
            </el-card>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="editBlog">编辑</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="danger" @click="deleteBlog">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
  <el-row align="middle" justify="center">
    <el-col :span="3"><Pagination/></el-col>
  </el-row>
</template>

<script>
import Pagination from '@/components/pagination/index.vue'
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const searchString = ref('')

export default {
  components : { Pagination }
}

const editBlog = () => {
  console.log('submit!')
}

const deleteBlog = () => {
  console.log('submit!')
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
