import { USER_REQUEST, USER_ERROR, USER_SUCCESS, AUTH_LOGOUT } from '../actionConstants/actions'
import apiCall from '@/utils/api'
import Vue from 'vue'

const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiCall({url: 'user/me'})
        .then(resp => {
          commit(USER_SUCCESS, resp)
        })
        .catch(resp => {
          commit(USER_ERROR)

          dispatch(AUTH_LOGOUT)
        })
    })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
