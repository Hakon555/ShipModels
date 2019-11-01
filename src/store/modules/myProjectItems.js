import { GET_PROJECT_ITEMS, GET_PROJECT_SCOPE_ITEMS } from '../actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/items',
  actions: {
    [GET_PROJECT_ITEMS]: ()=>{},
    [GET_PROJECT_SCOPE_ITEMS]: ({data}) => {return {data: Object.assign(data, {scope: true})}}
  }
});