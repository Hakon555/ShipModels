import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'
import modals from './modules/modals'
import menus from './modules/menus'
import cart from './modules/cart'
import myProjectItems from './modules/myProjectItems'
import catalogItems from './modules/catalogItems'
import constructionItems from './modules/constructionItems'
import statisticItems from './modules/statisticItems'
import necessaryDetails from './modules/necessaryDetails'
import necessaryFasteners from './modules/necessaryFasteners'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    auth,
    modals,
    menus,
    cart,
    myProjectItems,
    catalogItems,
    constructionItems,
    statisticItems,
    necessaryDetails,
    necessaryFasteners,
  }
})
