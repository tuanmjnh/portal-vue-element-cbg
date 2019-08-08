// import { auth, firestore } from '@/api/firebase/index'
import vnptbkn from '@/utils/http-client'
import { getToken, setToken, removeToken, getUserSetting, setUserSetting, removeUserSetting } from '@/utils/auth'
import message from '@/utils/message'
import router, { resetRouter } from '@/router'
const collection = 'auth'
const state = {
  uid: '',
  profile: {},
  roles: [],
  setting: {
    cookie: true,
    show: true,
    tags_view: true,
    fixed_header: true,
    sidebar_logo: true,
    theme: '#1890ff',
    language: 'vi'
  },
  token: getToken()
}

const mutations = {
  SET_UID: (state, uid) => {
    state.uid = uid
    // setToken(uid)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER: (state, user) => {
    state.profile = user
    state.roles = ['admin']// user.roles
    if (state.setting.cookie) {
      state.setting = { ...state.setting, ...getUserSetting() }
    } else {
      state.setting = { ...state.setting, ...user.setting }
    }
  },
  CHANGE_SETTING(state, item) {
    state.setting[item.key] = item.value
  }
}

const actions = {
  login({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_UID', 'login')
      commit('SET_TOKEN', 'admin')
      resolve(params)
      // if (params && params.loading) rootState.$getLoading = true

      // vnptbkn.post(collection, params)
      //   .then(doc => {
      //     commit('SET_UID', doc.uid)
      //     commit('SET_TOKEN', doc.token)
      //     resolve(doc)
      //   })
      // .catch((err) => {
      // console.log(err)
      // if (err.code === 'auth/invalid-email') err.message = 'login.auth_invalid_email'
      // else if (err.code === 'auth/user-not-found') err.message = 'login.auth_user_not_found'
      // else if (err.code === 'auth/wrong-password') err.message = 'login.auth_wrong_password'
      // else if (err.code === 'auth/too-many-requests') err.message = 'login.auth_too_many_requests'
      // else err.message = 'login.network_request_failed'
      // message.error(err)
      // reject(err)
      // })
      // .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  getUser({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_USER', {
        ma_nd: 'admin'
      })
      resolve(params)
      // if (params && params.loading) rootState.$getLoading = true
      // vnptbkn.get(collection, { uid: params.uid })
      //   .then(doc => {
      //     if (doc) {
      //       commit('SET_USER', doc)
      //       resolve(doc)
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     message.error(err)
      //     reject(err)
      //   })
      //   .finally(() => { if (params && params.loading) rootState.$getLoading = false })
    })
  },
  setUserID({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('SET_UID', params.uid)
      resolve(true)
    })
  },
  logout({ commit, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (params && params.loading) rootState.$getLoading = true
      commit('SET_TOKEN', '')
      commit('SET_UID', '')
      removeToken()
      resetRouter()
      resolve(true)
      setTimeout(() => {
        if (params && params.loading) rootState.$getLoading = false
      }, 200)
    })
  },
  changeSetting({ commit, state, rootState }, params) {
    return new Promise((resolve, reject) => {
      if (state.setting.cookie) {
        commit('CHANGE_SETTING', params)
        setUserSetting(state.setting)
      } else {
        const data = {}
        data[`setting.${params.key}`] = params.value
        if (params && params.loading) rootState.$commitLoading = true
        collection.doc(state.uid)
          .update(data)
          .then((doc) => {
            commit('CHANGE_SETTING', params)
            resolve(true)
          })
          .catch((err) => {
            console.log(err)
            message.error(err)
            reject(err)
          })
          .finally(() => { if (params && params.loading) rootState.$commitLoading = false })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
