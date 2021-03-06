// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userinfo: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USEINFO: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', 'result.token')
      setToken('result.token')
      resolve()
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { result } = response
      //   commit('SET_TOKEN', result.token)
      //   setToken(result.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_USEINFO', { username: '111' })
      resolve({ username: '111' })
      // getInfo().then(response => {
      //   const { result } = response
      //   if (!result) {
      //     reject('Verification failed, please Login again.')
      //   }
      //   commit('SET_USEINFO', result)
      //   resolve(result)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

