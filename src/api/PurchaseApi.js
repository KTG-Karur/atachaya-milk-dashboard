import { apiReturnCallBack } from './ApiConfig';
import { purchase, purchaseDetails } from './ApiContainer';

//GET
export function getPurchase(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", purchase, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PURCHASE_SUCCESS',
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
          type: 'GET_PURCHASE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function getPurchaseDetails(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", purchaseDetails, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PURCHASE_DETAILS_SUCCESS',
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
          type: 'GET_PURCHASE_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createPurchase(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", purchase, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_PURCHASE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_PURCHASE_SUCCESS',
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
          type: 'CREATE_PURCHASE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updatePurchase(request, purchaseId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", purchase +`/${purchaseId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_PURCHASE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_PURCHASE_SUCCESS',
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
          type: 'UPDATE_PURCHASE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}