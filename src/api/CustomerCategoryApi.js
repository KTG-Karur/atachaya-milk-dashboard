import { apiReturnCallBack } from './ApiConfig';
import { customerCategory } from './ApiContainer';

//GET
export function getCustomerCategory(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", customerCategory, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_CUSTOMER_CATEGORY_SUCCESS',
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
          type: 'GET_CUSTOMER_CATEGORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCustomerCategory(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", customerCategory, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_CUSTOMER_CATEGORY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_CUSTOMER_CATEGORY_SUCCESS',
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
          type: 'CREATE_CUSTOMER_CATEGORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCustomerCategory(request, customerCategoryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", customerCategory +`/${customerCategoryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_CUSTOMER_CATEGORY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_CUSTOMER_CATEGORY_SUCCESS',
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
          type: 'UPDATE_CUSTOMER_CATEGORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}