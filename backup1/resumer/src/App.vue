<template>
  <div id="app">
    <!--<p>{{text}}</p>-->
    <div class="page">
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
import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import icons from './assets/icons'
import store from './store/index'
export default {
  name: 'app',
  data: function () {
    return {
      text: '你好'
    }
  },
  store,
  components: {Topbar, ResumeEditor, ResumePreview},
  created () {
    document.body.insertAdjacentHTML('afterbegin', icons)
    // 在body开始标签后插入icons
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
    max-width: 1440px;
    margin-top:16px;
    margin-bottom: 16px;
    display: flex;
    /*justify-content: space-around;*/
    justify-content: space-between;
    padding: 0 16px;
    align-self: center;
    width:100%;
  }
}
#resumeEditor {
  min-width: 35%; //为什么min-width代替width就没有样式bug
  background: #444;
}
#resumePreview {
  // width: 61.666667%;
  background: #777;
  flex-grow: 1;
  margin-left: 16px;
}
svg.icon {
  height: 1em;
  width: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
  font-size: 16px;
}
</style>
