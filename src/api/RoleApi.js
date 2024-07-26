import { apiReturnCallBack } from './ApiConfig';
import { role } from './ApiContainer';

//GET
export function getRole(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", role, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_ROLE_SUCCESS',
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
          type: 'GET_ROLE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createRole(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", role, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_ROLE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_ROLE_SUCCESS',
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
          type: 'CREATE_ROLE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateRole(request, roleId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", role +`/${roleId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_ROLE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_ROLE_SUCCESS',
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
          type: 'UPDATE_ROLE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}