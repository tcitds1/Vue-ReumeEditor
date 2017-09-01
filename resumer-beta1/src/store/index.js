import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'
import getAVUser from '../getAVUser'
import AV from './leancloud'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    preview: false,
    selected: 'profile',
    fillConfig:[
      {field: 'profile', icon: 'id', type:"object", keys: ['name', 'profession', 'About']},
      { field: 'contacts', icon: 'phone', type: 'object', keys: ['email', 'phone', 'github', 'address' ] },
      { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'position', 'website', 'startDate', 'endDate', 'summary',['Principal Activity'] ] },
      { field: 'education', icon: 'book', type: 'array', keys: ['school','area','studyType','startDate','endDate','gpa', ['courses']] },
      { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'platform','startDate','endDate','website','summary'] },
      { field: 'skills', icon:'skills', type: 'array',keys: ['name','level', ['keywords']]},
      { field: 'awards', icon: 'cup', type: 'array', keys: ['title','date','address','summary'] },
    ],
    fillData:{
      "profile": {
        "name": "易文祥",
        "profession": "SoftwareEngineer",
        "About": "个人非常喜欢前端开发，热爱接触和学习新鲜事物，对一切充满好奇，喜欢探讨各种各样跟web有关的的奇技淫巧",
      },
      "contacts": {
        "email": "konyahoshi@gmail.com",
        "phone": "13131313113",
        "github": "https://github.com/tcitds1",
        "address": "湖南省长沙市"
      },
      "workHistory": [
        {
          "company": "东云研究所",
          "position": "CEO/President",
          "website": "http://dongyun.com",
          "startDate": "2013-12-01",
          "endDate": "2014-12-01",
          "summary" : "东云研究所是一所专业的高级的智能机器人研究机构，志在于使机器人更加智能化，造价更低，外观更美，更实用。",
          "Principal Activity": [
            "制作机器人",
            "给机器人编写识别程序",
            "在校内推广机器人"
          ]
        }
      ],
      "education": [
        {
          "school": "林业科技大学",
          "area": "湖南省长沙市",
          "studyType": "本科",
          "startDate": "2011-06-01",
          "endDate": "2014-01-01",
          "gpa": "4.0",
          "courses": [
            "必修-MySQL",
            "必修-Java",
            "选修-网络完全"
          ]
        }
      ],

      "awards": [
        {
          "title": "校奖学金N等奖",
          "date": "2014-11-01",
          "address": "林业科技大学",
          "summary": "在研究寝室温度与学习的三位曲线上做了比较大的贡献，提出了没有空调学不动，上课总是在五楼太坑爹，不吹风扇写不出代码等重要理论。"
        }
      ],
      "projects": [
        {
          "name": "基于Jsp的个人博客网站",
          "platform": "Web",
          "startDate": "2014-08-01",
          "endDate": "2014-10-01",
          "website": "http://jspblog.com",
          "summary": "JSP+MySql+Tomcat开发的个人博客网站，实现了注册登录，增删改除博客，并对博客进行分类的功能.用户可以对博客进行评论，并且在留言板留言，博主可以对这些评论进行回复"
        }
      ],
      "skills": [
        {
          "name": "Java Development",
          "level": "Junior",
          "keywords": [
            "Eclipse",
            "Android",
            "Jsp"
          ]
        },
        {
          "name": "Web Development",
          "level": "Junior",
          "keywords": [
            "HTML",
            "CSS",
            "Javascript"
          ]
        }
      ]
    },
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
        {field: 'profile', icon: 'id', type:"object", keys: ['name', 'profession', 'About']},
        { field: 'contacts', icon: 'phone', type: 'object', keys: ['email', 'phone', 'github', 'address' ] },
        { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'position', 'website', 'startDate', 'endDate', 'summary',['Principal Activity'] ] },
        { field: 'education', icon: 'book', type: 'array', keys: ['school','area','studyType','startDate','endDate','gpa', ['courses']] },
        { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'platform','startDate','endDate','website','summary'] },
        { field: 'skills', icon:'skills', type: 'array',keys: ['name','level', ['keywords']]},
        { field: 'awards', icon: 'cup', type: 'array', keys: ['title','date','address','summary'] },
    ],
    resume: {
      "profile": {
        "name": "易文祥",
        "profession": "SoftwareEngineer",
        "About": "个人非常喜欢前端开发，热爱接触和学习新鲜事物，对一切充满好奇，喜欢探讨各种各样跟web有关的的奇技淫巧",
      },
      "contacts": {
        "email": "konyahoshi@gmail.com",
        "phone": "13131313113",
        "github": "https://github.com/tcitds1",
        "address": "湖南省长沙市"
      },
      "workHistory": [
        {
          "company": "东云研究所",
          "position": "CEO/President",
          "website": "http://dongyun.com",
          "startDate": "2013-12-01",
          "endDate": "2014-12-01",
          "summary" : "东云研究所是一所专业的高级的智能机器人研究机构，志在于使机器人更加智能化，造价更低，外观更美，更实用。",
          "Principal Activity": [
            "制作机器人",
            "给机器人编写识别程序",
            "在校内推广机器人"
          ]
        }
      ],
      "education": [
        {
          "school": "林业科技大学",
          "area": "湖南省长沙市",
          "studyType": "本科",
          "startDate": "2011-06-01",
          "endDate": "2014-01-01",
          "gpa": "4.0",
          "courses": [
            "必修-MySQL",
            "必修-Java",
            "选修-网络完全"
          ]
        }
      ],

      "awards": [
        {
          "title": "校奖学金N等奖",
          "date": "2014-11-01",
          "address": "林业科技大学",
          "summary": "在研究寝室温度与学习的三位曲线上做了比较大的贡献，提出了没有空调学不动，上课总是在五楼太坑爹，不吹风扇写不出代码等重要理论。"
        }
      ],
      "projects": [
        {
          "name": "基于Jsp的个人博客网站",
          "platform": "Web",
          "startDate": "2014-08-01",
          "endDate": "2014-10-01",
          "website": "http://jspblog.com",
          "summary": "JSP+MySql+Tomcat开发的个人博客网站，实现了注册登录，增删改除博客，并对博客进行分类的功能.用户可以对博客进行评论，并且在留言板留言，博主可以对这些评论进行回复"
        }
      ],
      "skills": [
        {
          "name": "Java Development",
          "level": "Junior",
          "keywords": [
            "Eclipse",
            "Android",
            "Jsp"
          ]
        },
        {
          "name": "Web Development",
          "level": "Junior",
          "keywords": [
            "HTML",
            "CSS",
            "Javascript"
          ]
        }
      ]
    }
  },
  mutations: {
    fillResume (state) {
      Object.assign(state.resume,state.fillData)
      Object.assign(state.resumeConfig,state.fillConfig)
      // console.log('fillchenggong')
    },
    switchPreview (state) {
      if (!state.preview) {
        state.preview = true
      } else {
        state.preview = false
      }
      console.log('switchPreview成功' + state.preview)
    },
    initState (state, payload) {

      if (payload) {
        Object.assign(state, payload)
        console.log('initstate成功 从localstorage中获取state')
      }
      else {
        state.resumeConfig.map((item) => {
          // mention
          if (item.type === 'array') {
            Vue.set(state.resume, item.field, [])
          } else {
            Vue.set(state.resume, item.field, {})
            item.keys.map((key) => {
              Vue.set(state.resume[item.field], key, '')
            })
          }
        })
      }
    },
    switchTab (state, payload) {
      state.selected = payload
      // localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume (state, {path, value, arr}) {
      // state.resume[field][key] = value
      if(arr){
        Vue.set(state.resume[arr[0]][arr[1]][arr[2]],arr[3],value)
      }
      else {
        objectPath.set(state.resume, path, value)
      }

      // localStorage.setItem('state', JSON.stringify(state))
    },
    setUser (state, payload) {
      Object.assign(state.user, payload)
      console.log('setUser成功,state.user为:')
      console.dir(state.user)
    },
    removeUser (state) {
      state.user.id = ''
    },
    addResumeSubfield (state, {field,keys}) {
      if(keys){
        // state.resume[keys[0][keys[1]][keys[2]]].push(keys[3])
        (state.resume[keys[0]][keys[1]][keys[2]]).push(keys[3])
      }
      else{
        let empty = {}
        if (state.resume[field] instanceof Array === true) {
          state.resume[field].push(empty)
          state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
            if(Array.isArray(key)){
              Vue.set(empty, key[0], [])
            }
            else{
              Vue.set(empty, key, '')
            }
          })
        }
      }
    },
    removeResumeSubfield (state, {field, index, keys}) {
      if(keys){
        state.resume[keys[0]][keys[1]][keys[2]].splice(keys[3],1)
      }
      else{
        state.resume[field].splice(index, 1)
      }
      // console.log('state' + field + index)
      // console.dir(state.resume[field])
    },
    setResumeId (state, {id}) {
      state.resume.id = id
    },
    setResume (state, resume) {
      state.resumeConfig.map(({field}) => {
        Vue.set(state.resume, field, resume[field])
      })
      state.resume.id = resume.id
    }
  },
  actions: {
    saveResume ({state, commit}, payload) {
      let Resume = AV.Object.extend('Resume')
      var resume = new Resume()
      if (state.resume.id) {
        resume.id = state.resume.id
      }
      resume.set('profile', state.resume.profile)
      resume.set('workHistory', state.resume.workHistory)
      resume.set('education', state.resume.education)
      resume.set('projects', state.resume.projects)
      resume.set('awards', state.resume.awards)
      resume.set('contacts', state.resume.contacts)
      resume.set('owner_id', getAVUser().id)
      //
      var acl = new AV.ACL()
      acl.setPublicReadAccess(true)
      acl.setWriteAccess(AV.User.current(), true)
      resume.setACL(acl)
      // 这里有点蒙
      resume.save().then((response) => {
        if (!state.resume.id) {
          commit('setResumeId', {id: response.id})
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchResume ({commit}, payload) {
      console.log('fetchResume成功')
      if (getAVUser().id) {
        var query = new AV.Query('Resume')
        query.equalTo('owner_id', getAVUser().id)
        query.first().then((resume) => {
          if (resume) {
            commit('setResume', {id: resume.id, ...resume.attributes})
          }
        }, function (error) {
          console.log('出错啦')
          console.dir(error)
        })
      }
    }
    //
  }
})
