<template>
  <div id="resumePreview">
    <header>
      <h1>{{resume.profile.name}}</h1>
      <h2>{{resume.profile.profession}}</h2></header>
    <div id="content" class="container">


      <section id="basics">
        <div class="contact">
          <h2>Contact</h2>
          <div class="website">
            <strong>Github</strong><a :href="resume.contacts.github">{{resume.contacts.github}}</a></div>
          <div class="email">
            <strong>Email</strong>
            <!--<a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="24564d474c4556400a4c414a40564d4f57644349454d480a474b49">[email&nbsp;protected]</a>-->
            {{resume.contacts.email}}
          </div>
          <div class="phone">
            <strong>Phone</strong>{{resume.contacts.phone}}</div>
          <div class="address">
            <strong>Address</strong>{{resume.contacts.address}}</div>
        </div>
        <div class="summary">
          <!--<h3 class = "about">About</h3>-->
          <strong>About</strong>
          <p>{{resume.profile.About}}</p>
        </div>
        <!--<section id="profiles">-->
        <!--<div class="item">-->
        <!--<strong class="network">Twitter</strong></div>-->
        <!--<div class="item">-->
        <!--<strong class="network">SoundCloud</strong>-->
        <!--<div class="url">-->
        <!--<a href="https://soundcloud.com/dandymusicnl">dandymusicnl</a></div>-->
        <!--</div>-->
        <!--</section>-->
      </section>

      <section id="work">
        <h2>Work</h2>
        <section v-for="item in resume.workHistory">
          <div class="item">
            <h3 class="work_name">{{item.company}}</h3>
            <div class="work_position">{{item.position}}</div>
            <div class="work_date">
              <span class="startDate">{{item.startDate}}</span>
              <span class="endDate">- {{item.endDate}}</span></div>
            <div class="work_website">
              <a :href="item.website">{{item.website}}</a></div>
            <div class="summary">
              <p>{{item.summary}}</p>
            </div>
            <ul class="highlights">
              <li v-for="(value,index) in item.highlights">{{value}}</li>
            </ul>
          </div>
        </section>
      </section>

      <section id="education">
        <h2>Education</h2>
        <section v-for="item in resume.education">
          <div class="item">


            <div class="institution">{{item.school}}-{{item.area}}</div>
            <div class="study_date">
              <span class="startDate">{{item.startDate}}</span>
              <span class="endDate">- {{item.endDate}}</span></div>
            <div class="study_type">{{item.studyType}}</div>
            <ul class="courses">
              <li v-for="value in item.courses">{{value}}</li>
            </ul>
          </div>
        </section>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <section v-for="item in resume.projects">
          <div class="item">
            <h3 class="company">
              {{item.name}}
            </h3>
            <div class="work_position">
              {{item.platform}}
            </div>
            <div class="work_date">
            <span class="startDate">
              {{item.startDate}}
          	</span>
              <span class="endDate">
              {{item.endDate}}
              </span>
            </div>
            <div class="work_website">
              <a :href="item.website">{{item.website}}</a>
            </div>
            <div class="summary">
              <p>{{item.summary}}</p>
            </div>
            <!--<ul class="highlights">-->
            <!--<li>Awarded 'Teacher of the Month'</li>-->
            <!--</ul>-->
          </div>
        </section>
      </section>

      <section id="awards">
        <h2>Awards</h2>
        <section v-for="item in resume.awards">
          <div class="item">
            <div class="institution">{{item.title}}</div>
            <div class="study_date">
              <span class="startDate">{{item.date}}</span>
            </div>
            <div class="award_address">{{item.address}}</div>
            <div class="summary">{{item.summary}}</div>
          </div>
        </section>
      </section>

      <section id="skills">

        <h2>Skills</h2>
        <div class="item" v-for="item in resume.skills">
          <div class="name">{{item.name}}</div>
          <div class="level">
            <em>{{item.level}}</em></div>
          <ul class="keywords">
            <li v-for="(value,index) in item.keywords">{{value}}</li>
            <!--<li>CSS</li>-->
            <!--<li>Javascript</li>-->
          </ul>
        </div>
        <!--<div class="item">-->
        <!--<div class="name">Compression</div>-->
        <!--<div class="level">-->
        <!--<em>Master</em></div>-->
        <!--<ul class="keywords">-->
        <!--<li>Mpeg</li>-->
        <!--<li>MP4</li>-->
        <!--<li>GIF</li>-->
        <!--</ul>-->
        <!--</div>-->
      </section>
      <!--<section id="languages">-->
      <!--<h2>Languages</h2>-->
      <!--<div class="item">-->
      <!--<div class="language">English</div>-->
      <!--<div class="level">-->
      <!--<em>Native speaker</em></div>-->
      <!--</div>-->
      <!--</section>-->
      <!--<section id="interests">-->
      <!--<h2>Interests</h2>-->
      <!--<div class="item">-->
      <!--<div class="name">Wildlife</div>-->
      <!--<ul class="keywords">-->
      <!--<li>Ferrets</li>-->
      <!--<li>Unicorns</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--</section>-->
      <section id="references">
        <h2>References</h2>
        <div class="item">
          <blockquote class="reference">请多多关照让世界变得更加热闹的John Smith</blockquote>
          <div class="name">— Jhon Smith</div>
        </div>
      </section>


      <a href="#" :class="[{button:true},{print:true}, {show:show}]" @click.prevent="print">打印</a>

      <a class = "button comeback " href="#" v-on:click.prevent="switchPreview">返回</a>

    </div>
  </div>
  <!--<div id="resumePreview">-->
  <!--<section data-name="profile" v-if="resume.profile && resume.profile.name">-->
  <!--<h1>-->
  <!--{{resume.profile.name}}-->
  <!--</h1>-->
  <!--<h2>{{resume.profile.title}}</h2>-->
  <!--<p>-->
  <!--<small>{{resume.profile.city}}</small>-->
  <!--<small>{{resume.profile.birthday}}</small>-->
  <!--</p>-->
  <!--</section>-->

  <!--<section data-name="projects" v-if="resume.projects && resume.projects.length > 0">-->
  <!--<h2>项目经历</h2>-->
  <!--<ol>-->
  <!--<li v-for="item in resume.projects">-->
  <!--<h3>{{item.name}}</h3>-->
  <!--<p v-show="item.content"> {{item.content}} </p>-->
  <!--</li>-->
  <!--</ol>-->
  <!--</section>-->

  <!--<section data-name="workHistory" v-if="resume.workHistory&&resume.workHistory.length > 0">-->
  <!--<h2>工作经历</h2>-->
  <!--<ol>-->
  <!--<li v-for="item in resume.workHistory">-->
  <!--<h3>{{item.company}}</h3>-->
  <!--<p v-show="item.content"> {{item.content}} </p>-->
  <!--</li>-->
  <!--</ol>-->
  <!--</section>-->

  <!--<section data-name="education" v-if="resume.education&&resume.education.length > 0">-->
  <!--<h2>毕业院校</h2>-->
  <!--<ol>-->
  <!--<li v-for="item in resume.education">-->
  <!--<h3>{{item.school}}-->
  <!--<span v-show="item.content"> - {{item.content}} </span>-->
  <!--</h3>-->
  <!--</li>-->
  <!--</ol>-->
  <!--</section>-->

  <!--<section data-name="awards" v-if="resume.awards&&resume.awards.length > 0">-->
  <!--<h2>获奖情况</h2>-->
  <!--<ol>-->
  <!--<li v-for="item in resume.awards">-->
  <!--<h3>{{item.name}}</h3>-->
  <!--<p v-show="item.content"> {{item.content}} </p>-->
  <!--</li>-->
  <!--</ol>-->
  <!--</section>-->

  <!--<section data-name="contacts" v-if="resume.contacts&&resume.contacts.length > 0">-->
  <!--<h2>联系方式</h2>-->
  <!--<table>-->
  <!--<tr v-for="item in resume.contacts">-->
  <!--<td>{{item.contact}}</td>-->
  <!--<td v-show="item.content"> {{item.content}} </td>-->
  <!--</tr>-->
  <!--</table>-->
  <!--</section>-->
  <!--</div>-->
</template>
<script>
  export default {
    name: 'resumePreview',
    data () {
      return {
        show: true
      }
    },
    computed: {
      resume () {
        return this.$store.state.resume
      }
    },
    methods: {
      switchPreview () {
        this.$store.commit('switchPreview')
      },
      print () {
        setTimeout(function () {
          window.print();
        },500)
      }
    }
  }
</script>
<style scoped>

  .comeback {
    position:fixed;
    top:25px;
    right:10%;
    text-decoration: none;
    font-size: 20px;
    display: none;
    color:red !important;
    transition: all .3s;
  }
  body:hover .comeback {
    display: block;
  }
  .print:hover +.comeback{
    opacity: 0;
  }
  .print:hover {
    opacity: 0;
  }
  .print {
    position:fixed;
    top:100px;
    right:10%;
    text-decoration: none;
    font-size: 20px;
    opacity: 1;
    transition: all 1s;
  }
  .show {
    /*display: block;*/
    opacity: 1;
  }


  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }
  /*! normalize.css 2012-02-07T12:37 UTC - http://github.com/necolas/normalize.css */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  nav,
  section,
  summary {
    display: block
  }

  audio,
  canvas,
  video {
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  audio:not([controls]) {
    display: none
  }

  [hidden] {
    display: none
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%
  }

  html,
  button,
  input,
  select,
  textarea {
    font-family: sans-serif
  }

  body {
    margin: 0
  }

  a:focus {
    outline: thin dotted
  }

  a:hover,
  a:active {
    outline: 0
  }

  h1 {
    font-size: 2em;
    margin: .67em 0
  }

  h2 {
    font-size: 1.5em;
    margin: .83em 0
  }

  h3 {
    font-size: 1.17em;
    margin: 1em 0
  }

  h4 {
    font-size: 1em;
    margin: 1.33em 0
  }

  h5 {
    font-size: .83em;
    margin: 1.67em 0
  }

  h6 {
    font-size: .75em;
    margin: 2.33em 0
  }

  abbr[title] {
    border-bottom: 1px dotted
  }

  b,
  strong {
    font-weight: bold
  }

  blockquote {
    margin: 1em 40px
  }

  dfn {
    font-style: italic
  }

  mark {
    background: #ff0;
    color: #000
  }

  p,
  pre {
    margin: 1em 0
  }

  pre,
  code,
  kbd,
  samp {
    font-family: monospace, serif;
    _font-family: 'courier new', monospace;
    font-size: 1em
  }

  pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word
  }

  q {
    quotes: none
  }

  q:before,
  q:after {
    content: '';
    content: none
  }

  small {
    font-size: 75%
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
  }

  sup {
    top: -0.5em
  }

  sub {
    bottom: -0.25em
  }

  dl,
  menu,
  ol,
  ul {
    margin: 1em 0
  }

  dd {
    margin: 0 0 0 40px
  }

  menu,
  ol,
  ul {
    padding: 0 0 0 40px
  }

  nav ul,
  nav ol {
    list-style: none;
    list-style-image: none
  }

  img {
    border: 0;
    -ms-interpolation-mode: bicubic
  }

  svg:not(:root) {
    overflow: hidden
  }

  figure {
    margin: 0
  }

  form {
    margin: 0
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: .35em .625em .75em
  }

  legend {
    border: 0;
    padding: 0;
    white-space: normal;
    *margin-left: -7px
  }

  button,
  input,
  select,
  textarea {
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
    *vertical-align: middle
  }

  button,
  input {
    line-height: normal
  }

  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
    -webkit-appearance: button;
    *overflow: visible
  }

  button[disabled],
  input[disabled] {
    cursor: default
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
    *height: 13px;
    *width: 13px
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0
  }

  textarea {
    overflow: auto;
    vertical-align: top
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }
  /* General, overall styling */

  body {
    background: #ffffff;
    font-size: 0.9em;
    font-family: 'Lato', sans-serif;
    margin-bottom: 100px;
  }

  em {
    color: #999;
  }

  p {
    line-height: 1.4;
  }

  a {
    color: #31A6D6;
  }

  a:visited {
    color: #3061A5;
  }

  a:hover {
    color: #3061A5;
  }

  ul {
    margin-bottom: 0;
  }

  section {
    margin-bottom: 2em;
  }

  blockquote {
    margin: 0;
    margin-bottom: 1em;
  }
  /* End general, overall styling */
  /* Header name styling */

  header {
    padding-top: .1px;
    background: #68B6E3;
    padding: 50px;
    margin-bottom: 30px;
    width:100%;
    margin-right: auto;
    margin-left:auto;
  }

  header h1 {
    color: #FFFFFF;
    max-width: 800px;
    margin: 0 auto;
  }

  header h2 {
    color: #F3F3F3;
    font-size: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
  /* End header name styling */
  /* Set width of main body of CV */
  #resumePreview {
    background: #ffffff;
    overflow: auto;
    /*margin-top:15px;*/
    /*margin-left:12px;*/
    /*margin-right: 20px;*/
  }
  .container {
    font-size: 0.9em;
    max-width: 800px;
    margin: 0 auto;
    margin-top:15px;
    padding:10px 15px;
  }
  /* End */
  /* Styling Basics (Name, Contact, About, Profiles) */

  #basics {
    margin-bottom: 10px;
    border-top: 1px #E2E2E2 solid;
    border-bottom: 1px #E2E2E2 solid;
  }

  #basics h3 {
    margin-top: 1.5em;
    margin-bottom: 10px;
  }

  #basics .contact strong {
    line-height: 1.3;
    float: left;
    width: 80px;
  }

  .contact h3 {
    padding-bottom: 10px;
  }

  .website,
  .email,
  .phone {
    margin-bottom: 10px;
    float: left;
    width: 50%;
  }

  .summary {
    padding-top: 5px;
    clear: both;
  }

  #profiles {
    overflow: hidden;
  }

  #profiles .item {
    float: left;
    width: 50%;
  }

  .username {
    margin-top: 10px;
  }
  /* End 'Basics' Styling */
  /* Work and projectsing experience styling */

  .work_date,
  .work_position,
  .work_website,
  .institution,
  .study_date,
  .study_type
  .qualification {
    margin-bottom: 10px;
    float: left;
    width: 30%;
  }

  .courses {
    clear: both;
  }

  .dissertation {
    margin-top: 10px;
  }

  #awards,
  #work,
  #education,
  #projects {
    padding-bottom: 5px;
    border-bottom: 1px #E2E2E2 solid;
  }
  #awards .item,
  #work .item,
  #projects .item {
    margin: 25px 0;
  }
  /* End work and projectsing */
  /* Skills, languages, interests and references styling */

  #skills {
    margin-bottom: 10px;
    border-bottom: 1px #E2E2E2 solid;
    padding-bottom: 5px;
  }

  #skills .item,
  #languages .item {
    margin: 0 0 25px 0;
  }

  #interests .item {
    margin-bottom: 25px;
  }

  #skills {
    overflow: hidden;
  }

  #languages .item,
  #interests .item,
  #skills .item {
    float: left;
    width: 50%;
  }

  #references,
  #interests {
    clear: both;
  }
  /* End styling */
</style>
