<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main class="main">
      <router-view/>
    </el-main>
    <el-footer class="footer">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import Header from './header/index.vue'
import Blogs from './blogs/index.vue'
import Footer from '@/components/footer/index.vue'

export default {
  name: 'Blog',
  components: { Header, Blogs, Footer }
}
</script>

<style scoped>
.main {
  background-color: #ecf5ff;
}
.footer {
  background-color: #d9ecff;
}
</style>