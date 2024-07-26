import { apiReturnCallBack } from './ApiConfig';
import { paymentMode } from './ApiContainer';

//GET
export function getPaymentMode(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", paymentMode, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PAYMENT_MODE_SUCCESS',
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
          type: 'GET_PAYMENT_MODE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createPaymentMode(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", paymentMode, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_PAYMENT_MODE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_PAYMENT_MODE_SUCCESS',
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
          type: 'CREATE_PAYMENT_MODE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updatePaymentMode(request, paymentModeId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", paymentMode +`/${paymentModeId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_PAYMENT_MODE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_PAYMENT_MODE_SUCCESS',
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
          type: 'UPDATE_PAYMENT_MODE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}