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
    user: {
      id: '',
      username: ''
    },
    resumeConfig: [
        {field: 'profile', icon: 'id', type:"object", keys: ['name', 'city', 'title', 'birthday']},
        { field: 'contacts', icon: 'phone', type: 'object', keys: ['contact', 'content'] },
        { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'content'] },
        { field: 'education', icon: 'book', type: 'array', keys: ['school', 'content'] },
        { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'content'] },
        { field: 'skills', icon:'skills', type: 'array',keys: ['name','level','keywords']},
        { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'content'] },
    ],
    resume: {
      "profile": {
        "name": "易文祥",
        "profession": "SoftwareEngineer",
        "summary": "我就是喜欢前端啊",
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
      "location": {
        "address": "2712 Broadway St",
        "postalCode": "CA 94115",
        "city": "San Francisco",
        "countryCode": "US",
        "region": "California"
      },
      "contacts": {
        "email": "konyahoshi@gmail.com",
        "phone": "13131313113",
        "website": "https://github.com/tictds1",
        "address": "湖南省长沙市"
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
            "Successfully won Techcrunch Disrupt",
            "Optimized an algorithm that holds the current world record for Weisman Scores"
          ]
        }
      ],
      "education": [
        {
          "school": "University of Oklahoma",
          "area": "Information Technology",
          "studyType": "Bachelor",
          "startDate": "2011-06-01",
          "endDate": "2014-01-01",
          "gpa": "4.0",
          "courses": [
            "DB1101 - Basic SQL",
            "CS2011 - Java Introduction"
          ]
        }
      ],

      "awards": [
        {
          "title": "Digital Compression Pioneer Award",
          "date": "2014-11-01",
          "address": "Techcrunch",
          "summary": "There is no spoon."
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
          "name": "Compression",
          "level": "Master",
          "keywords": [
            "Mpeg",
            "MP4",
            "GIF"
          ]
        },
        {
          "name": "Web Development",
          "level": "Master",
          "keywords": [
            "HTML",
            "CSS",
            "Javascript"
          ]
        }
      ],
      "languages": [
        {
          "language": "English",
          "fluency": "Native speaker"
        }
      ],

      "interests": [
        {
          "name": "Wildlife",
          "keywords": [
            "Ferrets",
            "Unicorns"
          ]
        }
      ],

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
      // Object.assign(state, payload)
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
      }
      console.log('initstate成功 从localstorage中获取state')
    },
    switchTab (state, payload) {
      state.selected = payload
      localStorage.setItem('state', JSON.stringify(state))
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
    addResumeSubfield (state, { field }) {
      let empty = {}
      if (state.resume[field] instanceof Array === true) {
        state.resume[field].push(empty)
        state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
          Vue.set(empty, key, '')
        })
      }
    },
    removeResumeSubfield (state, {field, index}) {
      // console.log('state' + field + index)
      state.resume[field].splice(index, 1)
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
