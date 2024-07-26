import { apiReturnCallBack } from './ApiConfig';
import { user } from './ApiContainer';

//GET
export function getUser(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", user, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_USER_SUCCESS',
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
          type: 'GET_USER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createUser(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", user, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_USER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_USER_SUCCESS',
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
          type: 'CREATE_USER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateUser(request, userId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", user +`/${userId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_USER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_USER_SUCCESS',
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
          type: 'UPDATE_USER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}