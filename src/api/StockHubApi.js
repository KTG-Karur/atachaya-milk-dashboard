import { apiReturnCallBack } from './ApiConfig';
import { stockHub } from './ApiContainer';

//GET
export function getStockHub(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", stockHub, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_STOCK_HUB_SUCCESS',
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
          type: 'GET_STOCK_HUB_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createStockHub(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", stockHub, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_STOCK_HUB_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_STOCK_HUB_SUCCESS',
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
          type: 'CREATE_STOCK_HUB_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateStockHub(request, stockHubId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", stockHub +`/${stockHubId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_STOCK_HUB_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_STOCK_HUB_SUCCESS',
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
          type: 'UPDATE_STOCK_HUB_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}