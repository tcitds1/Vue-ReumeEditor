<template>
    <div id="resumeEditor">
        <!--i am resumeEditor-->
        <nav>
            <ol>
                <li v-for="(item,index) in resume.config" 
                     :class="{active: item.field === selected}"
                     @click="selected = item.field;">

                    <svg class="icon">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                </li>
            </ol>
        </nav>
        <ol class = "panels">
            <li v-for="item in resume.config" v-show="item.field === selected">
                <div v-if = "resume[item.field] instanceof Array ==true">
                    <div v-for="(subitem, i) in resume[item.field]">
                        <div class="resumeField"v-for="(value,key) in subitem">
                            <label>{{key}}</label>
                            <input type="text" :value="value"  @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
                            <hr>
                        </div>
                    </div>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label> {{key}} </label>
                    <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
                </div>
            </li>
            <!--<li>
                {{count}}
                <button @click="add">test</button>
            </li>-->
        </ol>
    </div>
</template>
<script>
export default {
  name: 'ResumeEditor',
  methods: {
    changeResumeField (path, value) {
      this.$store.commit('updateResume', {path, value})
    },
    test (value) {
      console.log(value)
    }
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
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
<style lang = "scss" scoped>
 #resumeEditor {
     background:#ffffff;
     box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
     display: flex;
     flex-direction: row;
     > nav {
         width:80px;
         overflow: auto;
         background: black;
         color:white;
         >ol {
             >li {
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
                margin-bottom: 16px;
                &.active {
                    background: white;
                    color: black;
                }
             }
         }
     }
     > .panels {
         flex-grow: 1;
         >li {
             padding: 24px;
         }
     }
     ol {
         list-style: none;
     }
     .resumeField {
         >label {
             display: block;
         }
         input[type=text] {
             margin: 16px 0 ;
             border: 1px solid #ddd;
             box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.25);
             width: 100%;
             height: 40px;
             padding: 0 8px;
         }
     }
     svg.icon {
         width: 24px;
         height: 24px;
     }

 }
 hr {
     border: none;
     border-top: 1px solid #ddd;
     margin: 24px 0;
 }

</style>

