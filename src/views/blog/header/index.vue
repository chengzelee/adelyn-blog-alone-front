<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="0">Adelyn</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="blogManage">个人空间</el-menu-item>
  </el-menu>
</template>

<script>

export default {
  components: {},
  methods: {
    blogManage(){
      this.$router.push({ path: '/manage' })
    }
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>