import { apiReturnCallBack } from './ApiConfig';
import { center } from './ApiContainer';

//GET
export function getCenter(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", center, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_CENTER_SUCCESS',
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
          type: 'GET_CENTER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCenter(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", center, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_CENTER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_CENTER_SUCCESS',
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
          type: 'CREATE_CENTER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCenter(request, centerId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", center +`/${centerId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_CENTER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_CENTER_SUCCESS',
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
          type: 'UPDATE_CENTER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}