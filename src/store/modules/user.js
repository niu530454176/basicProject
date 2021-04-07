import {getToken, setToken, removeToken} from '@/utils/auth'
import router from '@/router'

const state = {
  name: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {account, password} = userInfo
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  },
  setMouse({commit, state, dispatch}) {
    let mouseover = localStorage.getItem('mouseover')
    commit('SET_TOKEN1', mouseover)
  },
  // user logout
  logout({commit, state, dispatch}) {

  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({commit, dispatch}, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const {roles} = await dispatch('getInfo')
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
    router.addRoutes(accessRoutes)
    dispatch('tagsView/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
