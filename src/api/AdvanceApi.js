import { apiReturnCallBack } from './ApiConfig';
import { advance } from './ApiContainer';

//GET
export function getAdvance(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", advance, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_ADVANCE_SUCCESS',
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
          type: 'GET_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createAdvance(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", advance, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_ADVANCE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_ADVANCE_SUCCESS',
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
          type: 'CREATE_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateAdvance(request, advanceId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", advance +`/${advanceId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_ADVANCE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_ADVANCE_SUCCESS',
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
          type: 'UPDATE_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}