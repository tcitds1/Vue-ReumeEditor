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
        {field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday']},
        { field: 'workHistory', icon: 'work', type: 'array', keys: ['company', 'content'] },
        { field: 'education', icon: 'book', type: 'array', keys: ['school', 'content'] },
        { field: 'projects', icon: 'heart', type: 'array', keys: ['name', 'content'] },
        { field: 'awards', icon: 'cup', type: 'array', keys: ['name', 'content'] },
        { field: 'contacts', icon: 'phone', type: 'array', keys: ['contact', 'content'] }
    ],
    resume: {
      // profile: { },
      // workHistory: [ ],
      // education: [ ],
      // projects: [ ],
      // awards: [ ],
      // contacts: [ ]
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
    updateResume (state, {path, value}) {
      // state.resume[field][key] = value
      objectPath.set(state.resume, path, value)
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
    setResumerId (state, {id}) {
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
