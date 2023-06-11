<template>
  <el-row align="middle" justify="center">
    <el-col :span="18" justify="center">
      <h1 class="title">{{ blogTitle }}</h1>
    </el-col>
    <el-col :span="18" justify="center">
      <div v-html="blogContent"/>
    </el-col>
  </el-row>
</template>

<script setup>
import * as blogApi from '@/api/blog/blog.js'
import { useRouter } from 'vue-router'
import { ref, onMounted } from "vue";

onMounted(() => {
  getBlogContent()
})

const blogTitle = ref('')
const blogContent = ref('')

const getBlogContent  = () => {
  const router = useRouter()
  let blogId = router.currentRoute.value.query.blogId
  blogApi.getBlogContent({ blogId: blogId }).then(
      (res) => {
        blogTitle.value = res.blogTitle
        blogContent.value = res.blogContent
      }
  )
}

</script>

<style scoped>

.title {
  text-align: center;
}

</style>
