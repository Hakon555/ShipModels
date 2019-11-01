import { GET_TOP_MENU, GET_BOTTOM_MENU } from '../actionConstants/actions'
import apiCall from '@/utils/api'

const state = {
  menus: {
    topMenuLinks: [],
    bottomMenuLinks: [],
  }
};

const actions = {
  [GET_TOP_MENU]: ({commit, dispatch}, route) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'menu/top', data: {route: route}})
        .then(resp => {
          commit('updateTopMenu', resp)
        })
    })
  },
  [GET_BOTTOM_MENU]: ({commit, dispatch}, route) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'menu/bottom', data: {route: route}})
        .then(resp => {
          commit('updateBottomMenu', resp)
        })
    })
  },
}

const getters = {
  topMenuLinks: state => state.menus.topMenuLinks,
  bottomMenuLinks: state => state.menus.bottomMenuLinks,
}

const mutations = {
  updateTopMenu (state, value) {
    state.menus.topMenuLinks = value;
  },
  updateBottomMenu (state, value) {
    state.menus.bottomMenuLinks = value;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
}
