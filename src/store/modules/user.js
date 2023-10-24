import { login } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getUserInfo()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USERINFO(state, payload) {
    state.userInfo = payload
    setUserInfo(payload)
  },
  SET_TOKEN(state, payload) {
    state.token = payload
    setToken(payload)
  },
  REMOVE_TOKEN(state) {
    state.token = null
    removeToken()
  },
  REMOVE_USERINFO(state) {
    state.userInfo = null
    setUserInfo(null)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    commit('SET_TOKEN', data.token.token)
    commit('SET_USERINFO', data.user)
  },

  // user logout
  logout({ commit, state }) {
    commit('REMOVE_TOKEN')
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

