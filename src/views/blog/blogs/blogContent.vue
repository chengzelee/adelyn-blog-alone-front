<template>
  <el-row align="middle" justify="center">
    <el-col :span="24">
      <div v-html="blogTitle"></div>
    </el-col>
    <el-col :span="24">
      <div v-html="blogContent"></div>
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
  console.log(blogId)
  blogApi.getBlogContent({ blogId: blogId }).then(
      (res) => {
        console.log(res.content)
        blogTitle.value = res.title
        blogContent.value = res.content
      }
  )
}

</script>

<style scoped>

</style>