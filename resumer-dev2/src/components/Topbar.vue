<template>
    <div id="Topbar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
            <div class="actions">
                <div v-if="logined" class="userActions">
                    <span class="welcome">你好,{{user.username}}</span>
                    <a href="#" class="button" @click.prevent = "signOut">登出</a>
                </div>
                <div v-else class="userActions">
                    <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>
                    <a href="#" class="button" @click.prevent="signInDialogVisible = true">登录</a>
                </div>
                <MyDialog title = "登录" :visible = "signInDialogVisible" @close = "signInDialogVisible = false">
                    <SignInForm @success="signIn"></SignInForm>
                </MyDialog>  
                <MyDialog title = "注册" :visible = "signUpDialogVisible" @close = "signUpDialogVisible = false">
                    <SignUpForm @success="signIn"/>
                </MyDialog>
            </div>
        </div>
    </div>
</template>

<script>
import SignInForm from './SignInForm'
import AV from '../store/leancloud'
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
export default {
  name: 'Topbar',
  data () {
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false
    }
  },
  components: {
    MyDialog, SignUpForm, SignInForm
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    logined () {
      return this.user.id
    }
  },
  methods: {
    signIn (user) {
      this.signUpDialogVisible = false
      this.signInDialogVisible = false
      this.$store.commit('setUser', user)
      console.log('signIn成功')
      this.$store.dispatch('fetchResume')
    },
    signOut () {
      console.log('登出')
      AV.User.logOut()
      this.$store.commit('removeUser')
      this.$store.commit('initState')
    }
  }
}
</script>

<style scoped lang = "scss">
    #Topbar {
        background:#ffffff;
        box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
        >.wrapper {
            min-width: 1024px;
            max-width: 1440px;
            margin: 0 auto ;
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
        }
        .logo {
            font-size: 24px;
            color: #000000;
        }
        .button {
            width: 72px;
            height: 32px;
            border: none;
            font-size: 18px;
            background: ddd;
            color: #222;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            &:hover {
                box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
            }
            &.primary {
                background: #02af5f;
                color: white;
            }
        }
        .actions {
            display: flex;
            .userActions {
            }
            .welcome {
              margin-right: 5em;
            }
        }
        /*.actions > a {
            display: flex;
            
        }*/
    }

</style>
