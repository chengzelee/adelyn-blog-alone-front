<template>
  <div class="login-frame">
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="userInfo"
        style="max-width: 460px"
    >
      <el-form-item label="name">
        <el-input v-model="userInfo.principal" />
      </el-form-item>
      <el-form-item label="password">
        <el-input
            v-model="userInfo.credentials"
            type="password"
            show-password
            @keyup.enter="userLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import * as userApi from '@/api/blogmanage/user.js'
import { setToken } from '@/utils/auth.js'
import router from '@/router'

let userInfo = {
      principal: '',
      credentials: ''
    }

let labelPosition = 'right'

const userLogin = () => {
  userApi.login({principal: userInfo.principal, credentials: userInfo.credentials}).then(
      (res) => {
        console.log("res: " + res.accessToken)
        setToken(res.accessToken)
        router.push({ path: '/manage' })
      }
  )
}

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
