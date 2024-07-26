import { apiReturnCallBack } from './ApiConfig';
import { employee } from './ApiContainer';

//GET
export function getEmployee(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", employee, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_EMPLOYEE_SUCCESS',
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
          type: 'GET_EMPLOYEE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createEmployee(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", employee, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_EMPLOYEE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_EMPLOYEE_SUCCESS',
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
          type: 'CREATE_EMPLOYEE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateEmployee(request, employeeId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", employee +`/${employeeId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_EMPLOYEE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_EMPLOYEE_SUCCESS',
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
          type: 'UPDATE_EMPLOYEE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}