import { GET_NECESSARY_DETAILS } from '@/store/actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/necessary/details',
  actions: {
    [GET_NECESSARY_DETAILS]: ()=>{},
  }
});