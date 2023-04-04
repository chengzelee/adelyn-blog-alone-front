<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-main class="main">
      <Search/>
    </el-main>
    <el-main class="main">
      <Blogs/>
    </el-main>
    <el-footer class="footer">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import Header from './header/index.vue'
import Search from './search/index.vue'
import Blogs from './blogs/index.vue'
import Footer from '@/components/footer/index.vue'

export default {
  name: 'BlogManage',
  components: { Header, Search, Blogs, Footer }
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