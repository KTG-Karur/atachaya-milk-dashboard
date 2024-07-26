import { apiReturnCallBack } from './ApiConfig';
import { productUnit } from './ApiContainer';

//GET
export function getProductUnit(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", productUnit, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PRODUCT_UNIT_SUCCESS',
          payload: response.data
        })
      }).catch(error => {
        
        let errorMessage = error;
        if (error.response) {
          if (error.response.data.error) {
            errorMessage = error.response.data.message;
          }
        }
        dispatch({
          type: 'GET_PRODUCT_UNIT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createProductUnit(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", productUnit, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_PRODUCT_UNIT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_PRODUCT_UNIT_SUCCESS',
            payload: response.data
          })
        }
      }).catch(error => {
        let errorMessage = error;
        if (error.response) {
          if (error.response.data.error) {
            errorMessage = error.response.data.message;
          }
        }
        dispatch({
          type: 'CREATE_PRODUCT_UNIT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateProductUnit(request, productUnitId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", productUnit +`/${productUnitId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_PRODUCT_UNIT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_PRODUCT_UNIT_SUCCESS',
            payload: response.data
          })
        }
      }).catch(error => {
        let errorMessage = error;
        if (error.response) {
          if (error.response.data.error) {
            errorMessage = error.response.data.message;
          }
        }
        dispatch({
          type: 'UPDATE_PRODUCT_UNIT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}