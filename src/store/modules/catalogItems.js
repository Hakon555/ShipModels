import { GET_CATALOG_ITEMS } from '../actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/catalog/items',
  actions: {
    [GET_CATALOG_ITEMS]: ()=>{}
  }
});