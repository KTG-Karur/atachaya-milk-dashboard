import { apiReturnCallBack } from './ApiConfig';
import { paymentEntry } from './ApiContainer';

//GET
export function getPaymentEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", paymentEntry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PAYMENT_ENTRY_SUCCESS',
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
          type: 'GET_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createPaymentEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", paymentEntry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_PAYMENT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_PAYMENT_ENTRY_SUCCESS',
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
          type: 'CREATE_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updatePaymentEntry(request, paymentEntryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", paymentEntry +`/${paymentEntryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_PAYMENT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_PAYMENT_ENTRY_SUCCESS',
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
          type: 'UPDATE_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}