<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <input type="text" required v-model="formData.username">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" required v-model="formData.password">
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span>{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
import AV from '../store/leancloud'
import getErrorMessage from '../getErrorMessage'
import getAVUser from '../getAVUser'
export default {
  name: 'SignInForm',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signIn () {
      let {username, password} = this.formData
      AV.User.logIn(username, password).then((loginedUser) => {
        // this.$store.commit('setUser', getAVUser())
        this.$emit('success', getAVUser())
      }, (error) => {
        this.errorMessage = getErrorMessage(error)
      })
    }
  }
}

</script>

<style>
  
</style>
