import { apiReturnCallBack } from './ApiConfig';
import { rolePermission } from './ApiContainer';

//GET
export function getRolePermission(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", rolePermission, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_ROLE_PERMISSION_SUCCESS',
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
          type: 'GET_ROLE_PERMISSION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createRolePermission(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", rolePermission, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_ROLE_PERMISSION_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_ROLE_PERMISSION_SUCCESS',
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
          type: 'CREATE_ROLE_PERMISSION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateRolePermission(request, rolePermissionId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", rolePermission +`/${rolePermissionId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_ROLE_PERMISSION_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_ROLE_PERMISSION_SUCCESS',
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
          type: 'UPDATE_ROLE_PERMISSION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}