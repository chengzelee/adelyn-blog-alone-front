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

<script setup>
import Header from '@/views/blogmanage/header/index.vue'
import Footer from '@/components/footer/index.vue'
</script>

<style scoped>
.main {
  background-color: #ecf5ff;
}

.footer {
  background-color: #d9ecff;
}

.el-container {
  min-height: 100vh;
}
</style>