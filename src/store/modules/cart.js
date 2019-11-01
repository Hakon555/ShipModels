import { GET_CART_ITEMS, UPDATE_CART_ITEMS, ADD_NECESSARY_DETAILS_TO_CART, ADD_NECESSARY_FASTENERS_TO_CART } from '../actionConstants/actions'
import apiCall from '@/utils/api'

const state = { cartItems: [], quantity: 0, status: false }

const getters = {
  getCart: state => state.cartItems,
  getCartQuantity: state => state.quantity,
  getCartStatus: state => state.status,
}

const actions = {
  [GET_CART_ITEMS]: ({commit, dispatch, state}, requestParams) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'get/cart', requestParams, method: 'POST'})
        .then(resp => {
          if(resp.success){
            commit('updateItemsList', resp);
            commit('updateStatus');
          }
          resolve(resp);
        })
        .catch(err => {
          return err;
        });
    })
  },
  [UPDATE_CART_ITEMS]: ({commit, dispatch, state}, data) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'update/cart', data, method: 'POST'})
        .then(resp => {
          if(resp.success){
            dispatch(GET_CART_ITEMS);
            commit('updateStatus');
          }
          resolve(resp);
        })
        .catch(err => {
          return err;
        });
    })
  },
  [ADD_NECESSARY_DETAILS_TO_CART]: ({commit, dispatch, state}, data) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'update/cart/necessary/details', data, method: 'POST'})
        .then(resp => {
          if(resp.success){
            dispatch(GET_CART_ITEMS);
            commit('updateStatus');
          }
          resolve(resp);
        })
        .catch(err => {
          return err;
        });
    })
  },
  [ADD_NECESSARY_FASTENERS_TO_CART]: ({commit, dispatch, state}, data) => {
    return new Promise((resolve, reject) => {
      apiCall({url: 'update/cart/necessary/fasteners', data, method: 'POST'})
        .then(resp => {
          if(resp.success){
            dispatch(GET_CART_ITEMS);
            commit('updateStatus');
          }
          resolve(resp);
        })
        .catch(err => {
          return err;
        });
    })
  },
}

const mutations = {
  updateItemsList: (state, value) => {
    state.quantity = (value.quantity ? value.quantity : 0);
    state.cartItems = [...value.items];
  },
  updateStatus: (state) => {
    state.status = true;
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
