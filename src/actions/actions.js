import { constants } from "../constants";
import { services } from "../services";
export const actions = {
  GetProductList,
};
function GetProductList(args) {
  return (dispatch) => {
    dispatch(request());
    services.GetProductList(args).then(
      (productlist) => dispatch(success(productlist)),
      (error) => dispatch(failure(error.toString()))
    );
  };
  function request() {
    return { type: constants.GET_PRODUCT_LIST_REQUEST };
  }
  function success(productlist) {
    return {
      type: constants.GET_PRODUCT_LIST_SUCCESS,
      productlist,
    };
  }
  function failure(productlist) {
    return {
      type: constants.GET_PRODUCT_LIST_FAILURE,
      productlist,
    };
  }
}
