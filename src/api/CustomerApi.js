import { apiReturnCallBack } from './ApiConfig';
import { customer } from './ApiContainer';

//GET
export function getCustomer(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", customer, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_CUSTOMER_SUCCESS',
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
          type: 'GET_CUSTOMER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCustomer(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", customer, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_CUSTOMER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_CUSTOMER_SUCCESS',
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
          type: 'CREATE_CUSTOMER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCustomer(request, customerId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", customer +`/${customerId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_CUSTOMER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_CUSTOMER_SUCCESS',
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
          type: 'UPDATE_CUSTOMER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}