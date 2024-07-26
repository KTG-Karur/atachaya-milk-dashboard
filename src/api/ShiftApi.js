import { apiReturnCallBack } from './ApiConfig';
import { shift } from './ApiContainer';

//GET
export function getShift(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", shift, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_SHIFT_SUCCESS',
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
          type: 'GET_SHIFT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createShift(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", shift, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_SHIFT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_SHIFT_SUCCESS',
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
          type: 'CREATE_SHIFT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateShift(request, shiftId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", shift +`/${shiftId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_SHIFT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_SHIFT_SUCCESS',
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
          type: 'UPDATE_SHIFT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}