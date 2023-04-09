<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0">Adelyn</el-menu-item>
    <el-menu-item index="1" @click="addBlog">添加文章</el-menu-item>
    <el-menu-item index="2">tags</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">个人空间</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    addBlog(){
      this.$router.push({ path: '/manage/addblog' })
    }
  }
}

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>