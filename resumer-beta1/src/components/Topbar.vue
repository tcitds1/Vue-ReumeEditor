<template>
    <div id="Topbar">
        <!--顶部栏-->
        <div class="wrapper">
            <span class="logo"></span>

            <div class="actions">
                <div v-if="logined" class="userActions">
                    <!--如果已经登录，显示已登录用户-->
                    <span class="welcome">你好,{{user.username}}</span>
                    <!--登出-->
                    <a href="#" class="button" @click.prevent = "signOut">登出</a>
                </div>
                <div v-else class="userActions">
                    <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>
                    <a href="#" class="button" @click.prevent="signInDialogVisible = true">登录</a>
                </div>
                <!--通过点击预览按钮切换到预览模块-->
                <a href="#" class="button" @click.prevent="switchPreview">预览</a>
                <!--通过prop父子间通信，传递visible的值来决定是否显示注册登录框-->

                <MyDialog title = "登录" :visible = "signInDialogVisible" @close = "signInDialogVisible = false">
                    <SignInForm @success="signIn"></SignInForm>
                </MyDialog>
                <!--通过prop父子间通信，传递visible的值-->
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
//引入登录模块，注册模块，注册登录模块所在的容器，云端服务器适配密码

export default {
  name: 'Topbar',
  data () {
    return {
      signUpDialogVisible: false, //是否显示注册框
      signInDialogVisible: false  //是否显示登录框
    }
  },
  components: {
    MyDialog, SignUpForm, SignInForm
    //将引入模块注册成组件
  },
  computed: {
    user () {
      return this.$store.state.user
      //返回当前用户
    },
    logined () {
      return this.user.id
      //通过id值判断当前用户是否存在
    }
  },
  methods: {
    signIn (user) {
      this.signUpDialogVisible = false
      this.signInDialogVisible = false
      this.$store.commit('setUser', user)
      this.$store.dispatch('fetchResume')
      console.log('signIn成功')
      //登录成功将用户数据存储到state
      //并获取用户在云端数据
    },
    signOut () {
      //注销用户
      console.log('登出')
      AV.User.logOut()
      this.$store.commit('removeUser')
      this.$store.commit('initState')
    },
    switchPreview () {
      //通过调节preview的值来是否跳转到预览模块
      this.$store.commit('switchPreview')
    }
  }
}
</script>

<style scoped lang = "scss">
    #Topbar {
        background:#ffffff;
        box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
        >.wrapper {
            z-index: 1000;
            position: relative;
            min-width: 1024px;
            max-width: 1440px;
            margin: 0 auto ;
            height: 60px;
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
            border-radius:3px;
            width: 72px;
            height: 32px;
            border: none;
            font-size: 18px;
            background: #ddd;
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
              margin-right: 5px;
            }
            .welcome {
              vertical-align: middle;
              font-size: 18px;
              margin-right: 5em;
              line-height: 32px;
            }
        }
        /*.actions > a {
            display: flex;

        }*/
    }

</style>
