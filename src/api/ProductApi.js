import { apiReturnCallBack } from './ApiConfig';
import { product } from './ApiContainer';

//GET
export function getProduct(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", product, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PRODUCT_SUCCESS',
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
          type: 'GET_PRODUCT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createProduct(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", product, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_PRODUCT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_PRODUCT_SUCCESS',
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
          type: 'CREATE_PRODUCT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateProduct(request, productId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", product +`/${productId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_PRODUCT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_PRODUCT_SUCCESS',
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
          type: 'UPDATE_PRODUCT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}