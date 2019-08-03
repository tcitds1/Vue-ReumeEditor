import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'
import getAVUser from '../getAVUser'
import AV from './leancloud'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // count: 0,
    preview: false,
    selected: 'profile',
    bugWrapper:false,
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
        {field: 'profile', icon: 'id', type:"object", keys: ['name', 'profession', 'About']},
        { field: 'contacts', icon: 'phone', type: 'object', keys: ['email', 'phome', 'github', 'address' ] },
        { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'position', 'website', 'startDate', 'endDate', 'summary',['hightlights'] ] },
        { field: 'education', icon: 'book', type: 'array', keys: ['school','area','studyType','startDate','endDate','gpa', ['courses']] },
        { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'platform','startDate','endDate','website','summary'] },
        { field: 'skills', icon:'skills', type: 'array',keys: ['name','level', ['keywords']]},
        { field: 'awards', icon: 'cup', type: 'array', keys: ['title','date','address','summary'] },
    ],
    resume: {
      "profile": {
        "name": "陈清扬",
        "profession": "SoftwareEngineer",
        "About": "我就是喜欢前端啊",
        // "Internet": [
        //   {
        //     "network": "Twitter",
        //     "username": "neutralthoughts",
        //     "url": ""
        //   },
        //   {
        //     "network": "SoundCloud",
        //     "username": "dandymusicnl",
        //     "url": "https://soundcloud.com/dandymusicnl"
        //   }
        // ]
      },
      // "location": {
      //   "address": "2712 Broadway St",
      //   "postalCode": "CA 94115",
      //   "city": "San Francisco",
      //   "countryCode": "US",
      //   "region": "California"
      // },
      "contacts": {
        "email": "konyahoshi@gmail.com",
        "phone": "13131313113",
        "github": "https://github.com/tcitds1",
        "address": "广东省xxx"
      },
      "workHistory": [
        {
          "company": "东云研究所",
          "position": "CEO/President",
          "website": "http://dongyun.com",
          "startDate": "2013-12-01",
          "endDate": "2014-12-01",
          "summary" : "今天又是和平的一天",
          "highlights": [
            "制作机器人",
            "给版本喂饭",
            "准备上学"
          ]
        }
      ],
      "education": [
        {
          "school": "东云研究所",
          "area": "广东省xxx",
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
          "title": "银河系第一奖项",
          "date": "2014-11-01",
          "address": "火星",
          "summary": "在研究怎么利用二次元发电上做出巨大贡献"
        }
      ],
      //volunteer
      "projects": [
        {
          "name": "机器人自动化设计",
          "platform": "Android",
          "startDate": "2014-08-01",
          "endDate": "2014-10-01",
          "website": "http://robert.com",
          "summary": "Innovative middle-out compression algorithm that changes the way we store data."
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
      ],
      // "languages": [
      //   {
      //     "language": "English",
      //     "fluency": "Native speaker"
      //   }
      // ],
      //
      // "interests": [
      //   {
      //     "name": "Wildlife",
      //     "keywords": [
      //       "Ferrets",
      //       "Unicorns"
      //     ]
      //   }
      // ],

      "references": [
        {
          "name": "Erlich Bachman",
          "reference": "It is my pleasure to recommend Richard, his performance working as a consultant for Main St. Company proved that he will be a valuable addition to any company."
        }
      ]
    }
  },
  mutations: {
    switchPreview (state) {
      if (!state.preview) {
        state.preview = true
      } else {
        state.preview = false
      }
      console.log('switchPreview成功' + state.preview)
    },
    initState (state, payload) {
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
      if (payload) {
        Object.assign(state, payload)
        // console.log('initstate payload);
      }
      console.log('initstate成功 从localstorage中获取state')
    },
    switchTab (state, payload) {
      state.selected = payload
      // localStorage.setItem('state', JSON.stringify(state))
      关闭
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
      state.user = {id:'',username:''};
      console.log("removeUSER成功")
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
              Vue.set(empty, key[0], [''])
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
