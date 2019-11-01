import { GET_NECESSARY_FASTENERS } from '@/store/actionConstants/actions'
import GetItemsVuex from '@/utils/GetItemsVuex'

export default new GetItemsVuex({
  namespaced: true,
  url: 'get/necessary/fasteners',
  actions: {
    [GET_NECESSARY_FASTENERS]: ()=>{},
  }
});