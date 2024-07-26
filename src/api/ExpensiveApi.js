import { apiReturnCallBack } from './ApiConfig';
import { expensive } from './ApiContainer';

//GET
export function getExpensive(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", expensive, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_EXPENSIVE_SUCCESS',
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
          type: 'GET_EXPENSIVE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createExpensive(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", expensive, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_EXPENSIVE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_EXPENSIVE_SUCCESS',
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
          type: 'CREATE_EXPENSIVE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateExpensive(request, expensiveId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", expensive +`/${expensiveId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_EXPENSIVE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_EXPENSIVE_SUCCESS',
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
          type: 'UPDATE_EXPENSIVE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}