<template>
    <div id="resumePreview">
      <section data-name="profile" v-if="resume.profile && resume.profile.name">
        <h1>
          {{resume.profile.name}}
        </h1>
        <h2>{{resume.profile.title}}</h2>
        <p>
          <small>{{resume.profile.city}}</small>
          <small>{{resume.profile.birthday}}</small>
        </p>
      </section>

      <section data-name="projects" v-if="resume.projects && resume.projects.length > 0">
        <h2>项目经历</h2>
        <ol>
          <li v-for="item in resume.projects">
            <h3>{{item.name}}</h3>
            <p v-show="item.content"> {{item.content}} </p>
          </li>
        </ol>
      </section>

      <section data-name="workHistory" v-if="resume.workHistory&&resume.workHistory.length > 0">
        <h2>工作经历</h2>
        <ol>
          <li v-for="item in resume.workHistory">
            <h3>{{item.company}}</h3>
            <p v-show="item.content"> {{item.content}} </p>
          </li>
        </ol>
      </section>

      <section data-name="education" v-if="resume.education&&resume.education.length > 0">
        <h2>毕业院校</h2>
        <ol>
          <li v-for="item in resume.education">
            <h3>{{item.school}}
              <span v-show="item.content"> - {{item.content}} </span>
            </h3>
          </li>
        </ol>
      </section>

      <section data-name="awards" v-if="resume.awards&&resume.awards.length > 0">
        <h2>获奖情况</h2>
        <ol>
          <li v-for="item in resume.awards">
            <h3>{{item.name}}</h3>
            <p v-show="item.content"> {{item.content}} </p>
          </li>
        </ol>
      </section>

      <section data-name="contacts" v-if="resume.contacts&&resume.contacts.length > 0">
        <h2>联系方式</h2>
        <table>
          <tr v-for="item in resume.contacts">
            <td>{{item.contact}}</td>
            <td v-show="item.content"> {{item.content}} </td>
          </tr>
        </table>
      </section>
      <a class = "button"href="#" v-on:click.prevent="switchPreview">返回</a>
    </div>
</template>
<script>
  export default {
    name: 'resumePreview',
    computed: {
      resume () {
        return this.$store.state.resume
      }
    },
    methods: {
      switchPreview () {
        this.$store.commit('switchPreview')
      }
    }
  }
</script>
<style lang = "scss" scoped>
  /*#resumePreview {
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
  }*/
  /*.ctWrapper {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
  /*}*/
  /*.wrapper {*/
    /*position: absolute;*/
    /*top:0;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom:0;*/
  /*}*/
  .button {
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
    position: absolute;
    top:0;
    right:10%;
  }
  #resumePreview{
    max-width: 1000px;
    margin: 0 auto;
    overflow: auto;
    background:white;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    padding: 2em;
    text-align: left;
    color: #333;
    line-height: 1.2;
    * {
      box-sizing: border-box;
      font-variant: normal;
      font-weight: normal;
    }
    ol{
      list-style: none;
    }
    section + section{
      margin-top: 2em;
    }
    p{
      white-space: pre-line;
    } // 请问为什么要加这一行
    section {
      > h2:first-child{ background: #ddd; display: inline-block; padding: .2em;
        margin-bottom: .5em;
      }
    }
    section[data-name="profile"]{
      > h1{ margin: .1em 0; font-size: 4em; }
    }
    section[data-name="workHistory"]{
      li + li { margin-top: 1em; }
      li {
        h3{ border-bottom: 1px solid #999; padding-bottom: .3em; margin-bottom: .3em; }
      }
    }
    section[data-name="education"]{
      li{
        line-height: 1.5;
      }
    }
  }
</style>

