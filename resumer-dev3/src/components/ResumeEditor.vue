<template>
    <div id="resumeEditor">
        <!--i am resumeEditor-->
        <nav>
            <ol>
                <li title="主页">
                  <!--<svg class="icon" >-->
                    <!--<use :xlink:href="`#icon-black`"></use>-->
                  <!--</svg>-->
                  Resume
                </li>
                <li v-for="(item,index) in resumeConfig"
                     :class="{active: item.field === selected}"
                     @click="selected = item.field;">

                    <svg class="icon">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                </li>
            </ol>
        </nav>
        <ol class = "panels">
            <li v-for="item in resumeConfig" v-show="item.field === selected">
                <div v-if = "item.type === 'array'">
                    <div v-for="(subitem, i) in resume[item.field]">

                        <div class="resumeField"v-for="(value,key) in subitem">
                          <div v-if="Array.isArray(value)">
                            <div v-for="(value_inline,index) in value">
                              <input type="text" :value="value_inline"  @input="changeResumeField(`${item.field}.${i}.${key}.${index}`, $event.target.value,[item.field,i,key,index])">
                              <hr>
                            </div>
                          </div>
                          <div v-else>
                            <label>{{key}}</label>
                            <input type="text" :value="value"  @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
                            <hr>
                          </div>
                        </div>

                    </div>
                </div>

                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label> {{key}} </label>
                    <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
                </div>
                <!--<button @click = "addResumeSubfield(item)">新建</button>-->
            </li>
        </ol>
    </div>
</template>
<script>
import getAVUser from '../getAVUser'
export default {
  name: 'ResumeEditor',
  methods: {
    changeResumeField (path, value, arr) {
      this.$store.commit('updateResume', {path, value, arr:arr})
//      console.dir(arr) 我真是个天才
    },
    test (value) {
      console.log(value)
    },
    addResumeSubfield (item) {
      this.$store.commit('addResumeSubfield', item)
      if (getAVUser().id) {
        this.$store.dispatch('saveResume')
      }
      console.dir(this.$store.state.resume[item['field']])
    },
    removeResumeSubfield (field, index) {
      this.$store.commit('removeResumeSubfield', {field, index})
      if (getAVUser().id) {
        this.$store.dispatch('saveResume')
      }
    }
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    resumeConfig () {
      return this.$store.state.resumeConfig
    },
    resume () {
      return this.$store.state.resume
    },
    selected: {
      get () {
        return this.$store.state.selected
      },
      set (val) {
        return this.$store.commit('switchTab', val)
      }
    },
    profile () {
      this.$store.state.profile
    }
  }
}
</script>
<style lang="scss">
  #resumeEditor{
    background:#e7e8ea;
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav{
      width: 80px;
      background: black;
      color: white;
      top:0;
      height:100vh;
      position: absolute;
      > ol {
        > li{
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top:15px;
          margin-bottom: 20px;
          &.active{
            background: white;
            color: black;
          }
        }
      }
    }
    > .panels{
      background: #ffffff;
      width:450px;
      margin-left:120px;
      margin-right: 30px;
      margin-top: 15px;
      margin-bottom:20px;
      box-shadow:0 1px 1px 0 rgba(0,0,0,0.25);

      > li {
        padding: 24px;
        h2{
          margin-bottom: 24px;
        }
      }
      overflow: auto
    }
    svg.icon{
      width: 28px; // 原设计稿 32px 不好看，改成 24px
      height: 28px;
    }
    ol{
      list-style: none;
    }
    .resumeField{
      > label{
        display: block;
      }
      input[type=text]{
        margin: 16px 0;
        border: 1px solid #ddd;
        box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);
        width: 100%;
        height: 40px;
        padding: 0 8px;
      }
    }
    hr{
      border: none;
      border-top: 1px solid #ddd;
      margin: 24px 0;
    }
    .subitem{
      position: relative;
      .button.remove{
        position: absolute;
        right: 0;
        top: -3px;
      }
    }
  }

  </style>
