import { constants } from '../constants'
export function productlist (state = {}, action) {
  switch (action.type) {
    case constants.GET_PRODUCT_LIST_REQUEST:
      return {
        getloading: true,
        no_data: '',
        getstatus: 'request'
      }
    case constants.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        getloading: false,
        items: action.productlist,
        getstatus: 'success'
      }
    case constants.GET_PRODUCT_LIST_FAILURE:
      return {
        getloading: false,
        no_data: '',
        getstatus: 'failure'
      }
        default:
      return state
  }
}
