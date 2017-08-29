<template>
  <div id="app">
    <Preview v-show="preview"/>
    <div class="page" v-show="!preview">
      <header>
        <!--顶部导航栏模块-->
        <Topbar/>
      </header>
      <main>
        <!--简历编辑模块-->
        <ResumeEditor/>
        <!--简历预览模块-->
        <ResumePreview/>
      </main>
    </div>
  </div>
</template>
<script>
import './assets/reset.css'
import 'normalize.css/normalize.css'
import Preview from './components/Preview'
import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import icons from './assets/icons'
import store from './store/index'
import getAVUser from './getAVUser'
export default {
  name: 'app',
  //数据属性
  data: function () {
    return {
      text: '你好'
  //      test文本
    }
  },
  //计算属性
  computed: {
    preview () {
      //返回preview属性，true or false
      return this.$store.state.preview
    }
  },
  //引入store管理数据
  store,
  //引入四大组件,顶部，编辑栏，预览栏，打印模块
  components: {Topbar, ResumeEditor, ResumePreview, Preview},
  //页面创建时候执行的方法
  created () {
    //插入SVG图标
    document.body.insertAdjacentHTML('afterbegin', icons)
    // this.$store.commit('initState')
    //获取当前用户，是否存在
    let user = getAVUser()
    //将当前用户信息存入store数据
    this.$store.commit('setUser', user)
    //如果当前存在已登录用户，访问云端数据库，获取数据
    if (user.id) {
      this.$store.dispatch('fetchResume')
    }
    //如不存在 从localstorage中获取数据，并初始化storage
    else {
      let state = localStorage.getItem('state')
      if (state) {
        this.$store.commit('initState', JSON.parse(state))
      }
    }
    //窗口关闭之前执行的方法，将数据存储到localstorage
    window.onbeforeunload = () => {
      let state = JSON.stringify(this.$store.state)
//      window.localStorage.setItem('state', state)
    }
  }
}
</script>

<style lang="scss">

html {
  background: #eaebec;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*使用SCSS语法嵌套，设置字体*/
}
.page {
  /*高度设置为浏览器可视化窗口高度，布局方式为flex，方向是垂直*/
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #EAEBEC;
  >main {
    /*设置响应式*/
    flex-grow: 1;
    min-width: 1024px;
    margin-top:10px;
    display: flex;
    /*justify-content: space-around;*/
    justify-content: space-between;
    /*padding: 0 16px;*/
    align-self: center;
    width:100%;
  }
}
#resumeEditor {
  min-width: 30%;
  //为什么min-width代替width就没有样式bug
  background: #444;
}
#resumePreview {
  background: #777;
  flex-grow: 1;
  //预览占据剩余空间
}
svg.icon {
  //设置SVG样式
  height: 1em;
  width: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
  font-size: 16px;
}
</style>
