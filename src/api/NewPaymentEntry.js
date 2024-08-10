import { apiReturnCallBack } from './ApiConfig';
import { newPaymentEntry } from './ApiContainer';

//GET
export function getNewPaymentEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", newPaymentEntry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_NEW_PAYMENT_ENTRY_SUCCESS',
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
          type: 'GET_NEW_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createNewPaymentEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", newPaymentEntry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_NEW_PAYMENT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_NEW_PAYMENT_ENTRY_SUCCESS',
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
          type: 'CREATE_NEW_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateNewPaymentEntry(request, paymentEntryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", newPaymentEntry +`/${paymentEntryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_NEW_PAYMENT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_NEW_PAYMENT_ENTRY_SUCCESS',
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
          type: 'UPDATE_NEW_PAYMENT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}