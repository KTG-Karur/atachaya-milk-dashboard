import { apiReturnCallBack } from './ApiConfig';
import { color } from './ApiContainer';

//GET
export function getColor(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", color, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_COLOR_SUCCESS',
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
          type: 'GET_COLOR_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createColor(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", color, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_COLOR_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_COLOR_SUCCESS',
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
          type: 'CREATE_COLOR_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateColor(request, colorId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", color +`/${colorId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_COLOR_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_COLOR_SUCCESS',
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
          type: 'UPDATE_COLOR_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}