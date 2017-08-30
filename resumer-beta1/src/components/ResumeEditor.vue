<template>
  <!--简历编辑模块-->
    <div id="resumeEditor">
        <!--aside侧边栏-->
        <nav>
            <ol>
                <li title="主页">
                  Resume
                </li>
                <!--遍历配置数据ResumeConfig,设置将不同的list对应不同svg图片-->
                <!--当点击的时候为该list添加class，使样式突出-->
                <li v-for="(item,index) in resumeConfig"
                     :class="{active: item.field === selected}"
                     @click="selected = item.field;" :title ="item.field" >
                    <svg class="icon" :id="item.field">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                </li>
            </ol>
        </nav>
        <!--编辑框-->
        <ol class = "panels">
            <!--遍历简历数据，展示侧边栏中选中的项-->
            <li v-for="item in resumeConfig" v-show="item.field === selected">
                <!--list名称-->
                <h3 class="fieldName">{{item.field}}</h3>
                <!--数据分开渲染，array和object-->
                <div v-if = "item.type === 'array'" class="arrayCt">
                    <div v-for="(subitem, i) in resume[item.field]" class = "arrayResume">
                      <div class="resumeField"v-for="(value,key) in subitem">
                          <!--再次细分渲染，array和string-->
                          <div v-if="Array.isArray(value)">
                            <h4 class = "keywords">{{key}}</h4>
                            <!--数组中的项-->
                            <div v-for="(value_inline,index) in value">
                              <div class="group array">
                                <input type="text" :value="value_inline"  @input="changeResumeField(`${item.field}.${i}.${key}.${index}`, $event.target.value,[item.field,i,key,index])" required>
                                <!--remove选项-->
                                <div class = "countbutton" @click = "removeResumeSubfield(item.field,i,[item.field,i,key,index])">
                                  <svg class="icon" id="delete">
                                    <use :xlink:href="`#icon-delete`"></use>
                                  </svg>
                                </div>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label> {{index+1}} </label>
                              </div>
                            </div>
                            <!--添加数组中的项-->
                            <div class="group array">
                              <input type="text" v-model="addnew" required>
                              <div class = "countbutton" @click = "addResumeSubfield(item.field,[item.field,i,key,addnew])">
                                <svg class="icon" id="add">
                                  <use :xlink:href="`#icon-add1`"></use>
                                </svg>
                              </div>
                              <span class="highlight"></span>
                              <span class="bar"></span>
                              <label>Add New</label>
                            </div>
                          </div>
                          <!--再次渲染-->
                          <div v-else>
                            <!--添加输入框动态样式group-->
                            <div class="group">
                              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)" required>
                              <span class="highlight"></span>
                              <span class="bar"></span>
                              <label> {{key}} </label>
                            </div>
                          </div>
                        </div>
                      <!--删除数据-->
                      <button @click = "removeResumeSubfield(item.field,i)" class="btRemove bigButton">remove</button>
                    </div>
                    <!--添加数据-->
                    <button @click = "addResumeSubfield(item.field)" class="btAdd bigButton">add</button>
                </div>
                <!--数据分开渲染-->
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <div class="group">
                      <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)" required>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label> {{key}} </label>
                    </div>
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
  data () {
    return {
      addnew:''
      //新建数据
    }
  },
  methods: {
    //根据输入框输入，同步更改state中的数据，提交参数commit
    changeResumeField (path, value, arr) {
      this.$store.commit('updateResume', {path, value, arr:arr})
    //      console.dir(arr) 我真是个天才
    },
    //测试
    test (value) {
      console.log(value)
    },
    //按钮添加事件,添加新的数组项到store
    addResumeSubfield (field,keys) {
      this.addnew = '';
      this.$store.commit('addResumeSubfield', {field,keys})
      if (getAVUser().id) {
        this.$store.dispatch('saveResume')
      }
//      console.dir(this.$store.state.resume[item['field']])
    },
    //按钮删除事件,删除state中对应的项
    removeResumeSubfield (field, index,keys) {
      this.$store.commit('removeResumeSubfield', {field, index,keys})
      if (getAVUser().id) {
        this.$store.dispatch('saveResume')
      }
    }
  },
  //计算属性，返回store中的数据
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
    },
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
      position: relative;
      .arrayResume + .arrayResume {
        margin-top:120px;
      }
      .arrayCt {
        position: relative;
      }
      .bigButton {
        position: absolute;
        width:100px;
        height:40px;
        color:#ffffff;
        border:none;
        border-radius: 4px;
        opacity: .7;
        cursor: pointer;
      }
      .bigButton:hover {
        opacity: 1;
      }
      .btRemove {
        right:5%;
        background-color:#c0392b;
      }
      .btAdd {
        left:5%;
        background-color: #02af5f;
      }

      .Rborder {
        border-bottom: 4px solid rgba(138, 121, 210, 0.46);
        width:90%;
        margin:10px auto;
      }
      .fieldName {
        width:90%;
        margin: 20px 4% 20px 6% ;
      }
      /*.arrayResume {*/
        /*border-bottom: 1px solid black;*/
        /*border*/
      /*}*/
      background: #fff;
      min-width:270px;
      width: 450px;
      margin-left:110px;
      margin-right: 20px;
      margin-top: 15px;
      /*border:1px solid black;*/
      box-shadow:0 1px 1px 0 rgba(0,0,0,0.25);
      /*border:1px solid black;*/
      > li {
        /*padding: 24px;*/
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
    #skills {
      width:40px !important;
      height:40px !important;
    }
    ol{
      list-style: none;
    }
    .resumeField{
      > label{
        display: block;
      }
      /*input[type=text]{*/
        /*margin-bottom: 16px;*/
        /*!*border: 1px solid #ddd;*!*/
        /*!*box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);*!*/
        /*width: 100%;*/
        /*height: 60px;*/
        /*padding: 10px 8px;*/
        /*padding-left: 20px;*/
        /*border:none;*/

      /*}*/


      h4,h5{
        width:90%;
        margin:0 auto;
      }
      .group {
        margin-top:45px;
        position:relative;
        margin-bottom:45px;
        margin-left:auto;
        margin-right:auto;
        min-width: 250px;

        input {
          font-size:16px;
          padding:10px 10px 10px 5px;
          display:block;
          border:none;
          border-bottom:1px solid #757575;
          margin:0 auto;
          width:90%;
          height: 35px;
        }
        input:focus 		{ outline:none; }

        /* LABEL ======================================= */
        label {
          margin-left:5%;
          color:#999;
          font-size:16px;
          font-weight:normal;
          position:absolute;
          pointer-events:none;
          left:5px;
          top:6px;
          transition:0.2s ease all;
          -moz-transition:0.2s ease all;
          -webkit-transition:0.2s ease all;
        }
        .countbutton {
          position: absolute;
          right:5%;
          top:20%;
          cursor: pointer;
        }
        #delete {
          color:#c0392b;
          opacity: .7;
        }
        #delete:hover {
          opacity: 1;
        }
        #add {
          color:#02af5f;
          width:28px;
          height:28px;
          opacity: .7;
        }
        #add:hover {
          opacity: 1;
        }
        /* active state */
        input:focus ~ label, input:valid ~ label 		{
          top:-20px;
          font-size:14px;
          color:#5264AE;
        }

        /* BOTTOM BARS ================================= */
        .bar 	{ position:relative; display:block; width:90%; margin:0 auto;}
        .bar:before, .bar:after 	{
          content:'';
          height:2px;
          width:0;
          bottom:1px;
          position:absolute;
          background:#5264AE;
          transition:0.2s ease all;
          -moz-transition:0.2s ease all;
          -webkit-transition:0.2s ease all;
        }
        .bar:before {
          left:50%;
        }
        .bar:after {
          right:50%;
        }
      }
      .array {
        margin-top:45px;
        position:relative;
        margin-bottom:45px;
        margin-left:auto;
        margin-right:auto;

        min-width: 250px;
        input {
          font-size:16px;
          padding:10px 10px 10px 5px;
          display:block;
          border:none;
          border-bottom:1px solid #757575;
          margin:0 15% 0 5%;
          width:80%;
          height: 35px;
        }
        input:focus 		{ outline:none; }

        /* LABEL ======================================= */
        label {
          margin-left:5%;
          color:#999;
          font-size:16px;
          font-weight:normal;
          position:absolute;
          pointer-events:none;
          left:5px;
          top:6px;
          transition:0.2s ease all;
          -moz-transition:0.2s ease all;
          -webkit-transition:0.2s ease all;
        }

        /* active state */
        input:focus ~ label, input:valid ~ label 		{
          top:-20px;
          font-size:14px;
          color:#5264AE;
        }

        /* BOTTOM BARS ================================= */
        .bar 	{ position:relative; display:block; width:80%; margin-left:5%}
        .bar:before, .bar:after 	{
          content:'';
          height:2px;
          width:0;
          bottom:1px;
          position:absolute;
          background:#5264AE;
          transition:0.2s ease all;
          -moz-transition:0.2s ease all;
          -webkit-transition:0.2s ease all;
        }
        .bar:before {
          left:50%;
        }
        .bar:after {
          right:50%;
        }
      }
      /* 父组件相对定位 */


      /* active state */
      input:focus ~ .bar:before, input:focus ~ .bar:after {
        width:50%;
      }

      /* HIGHLIGHTER ================================== */
      .highlight {
        position:absolute;
        height:60%;
        width:100px;
        top:25%;
        left:5%;
        pointer-events:none;
        opacity:0.5;
      }

      /* active state */
      input:focus ~ .highlight {
        -webkit-animation:inputHighlighter 0.3s ease;
        -moz-animation:inputHighlighter 0.3s ease;
        animation:inputHighlighter 0.3s ease;
      }

      /* ANIMATIONS ================ */
      @-webkit-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
      }
      @-moz-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
      }
      @keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
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
