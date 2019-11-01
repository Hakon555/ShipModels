import { GET_CONSTRUCTION_ITEMS } from '../actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/construction/items',
  actions: {
    [GET_CONSTRUCTION_ITEMS]: ()=>{}
  }
});