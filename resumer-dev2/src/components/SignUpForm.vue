<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="row">
        <label>用户名</label> 
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="row">
        <label >密码</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span class = "errorMessage">{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
import getAVUser from '../getAVUser'
import AV from '../store/leancloud'
import getErrorMessage from '../getErrorMessage'
export default {
  name: 'SignUpForm',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  created () {
  },
  methods: {
    signUp () {
      let {username, password} = this.formData
      var user = new AV.User()
      user.setUsername(username)
      user.setPassword(password)
      user.signUp().then((loginedUser) => {
        // 利用$emit('success')调用上一级@success的方法
        console.log('注册成功 调用$emit(success)')
        this.$emit('success', getAVUser(loginedUser))
      }, (error) => {
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}
</script>

<style>
  
</style>
