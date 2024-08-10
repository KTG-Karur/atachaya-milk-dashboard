import { apiReturnCallBack } from './ApiConfig';
import { salary, salaryEntryDetails } from './ApiContainer';

//GET
export function getSalary(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", salary, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_SALARY_SUCCESS',
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
          type: 'GET_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}
//GET
export function getSalaryEntryDetails(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", salaryEntryDetails, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_SALARY_ENTRY_DETAILS_SUCCESS',
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
          type: 'GET_SALARY_ENTRY_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createSalary(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", salary, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_SALARY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_SALARY_SUCCESS',
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
          type: 'CREATE_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateSalary(request, salaryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", salary +`/${salaryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_SALARY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_SALARY_SUCCESS',
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
          type: 'UPDATE_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}