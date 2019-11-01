import { GET_STATISTIC_ITEMS } from '../actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/statistic/items',
  actions: {
    [GET_STATISTIC_ITEMS]: ()=>{}
  }
});