<template>
  <div>
    用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
    <br><br>
    密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
    <br><br>
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin', // 用户名
        password: '123456', // 密码
        captcha: '' // 验证码
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      initVerify: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    login () {
      this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {
          })
    }
  }
}
</script>

