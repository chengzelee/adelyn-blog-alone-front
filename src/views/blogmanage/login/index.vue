<template>
  <div class="login-frame">
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="user"
        style="max-width: 460px"
    >
      <el-form-item label="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="password">
        <el-input
            v-model="user.password"
            type="password"
            show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const login = () => {
  console.log('submit!')
}

const user = reactive({
  name: '',
  password: ''
})
</script>

<style>
.login-frame {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 400px;
  height: 300px;
  background: #fff;
  box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.1);
  margin: auto;
}
</style>
