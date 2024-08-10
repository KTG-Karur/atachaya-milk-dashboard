import { apiReturnCallBack } from './ApiConfig';
import { customerSalary } from './ApiContainer';

//GET
export function getCustomerSalary(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", customerSalary, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_CUSTOMER_SALARY_SUCCESS',
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
          type: 'GET_CUSTOMER_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCustomerSalary(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", customerSalary, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_CUSTOMER_SALARY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_CUSTOMER_SALARY_SUCCESS',
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
          type: 'CREATE_CUSTOMER_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCustomerSalary(request, customerSalaryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", customerSalary +`/${customerSalaryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_CUSTOMER_SALARY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_CUSTOMER_SALARY_SUCCESS',
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
          type: 'UPDATE_CUSTOMER_SALARY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}