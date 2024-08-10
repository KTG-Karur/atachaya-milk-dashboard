import { apiReturnCallBack } from './ApiConfig';
import { stockTransfer } from './ApiContainer';

//GET
export function getStockTransfer(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", stockTransfer, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_STOCK_TRANSFER_SUCCESS',
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
          type: 'GET_STOCK_TRANSFER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createStockTransfer(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", stockTransfer, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_STOCK_TRANSFER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_STOCK_TRANSFER_SUCCESS',
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
          type: 'CREATE_STOCK_TRANSFER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateStockTransfer(request, stockTransferId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", stockTransfer +`/${stockTransferId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_STOCK_TRANSFER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_STOCK_TRANSFER_SUCCESS',
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
          type: 'UPDATE_STOCK_TRANSFER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}