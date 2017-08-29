<template>
  <div id="app">
    <!--<p>{{text}}</p>-->
    <Preview v-show="preview"/>
    <div class="page" v-show="!preview">
      <header>
        <Topbar/>
      </header>
      <main>
        <ResumeEditor/>
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
  data: function () {
    return {
      text: '你好'
    }
  },
  computed: {
    preview () {
      return this.$store.state.preview
    }
  },
  store,
  components: {Topbar, ResumeEditor, ResumePreview, Preview},
  created () {
    document.body.insertAdjacentHTML('afterbegin', icons)

//    this.$store.commit('initState')
    let user = getAVUser()
    this.$store.commit('setUser', user)
    if (user.id) {
      this.$store.dispatch('fetchResume')
    } else {
      let state = localStorage.getItem('state')
      if (state) {
        this.$store.commit('initState', JSON.parse(state))
      }
    }
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
}
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #EAEBEC;
  >main {
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
  min-width: 30%; //为什么min-width代替width就没有样式bug
  background: #444;
}
#resumePreview {
  background: #777;

  flex-grow: 1;
}
svg.icon {
  height: 1em;
  width: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
  font-size: 16px;
}
</style>
