import { apiReturnCallBack } from './ApiConfig';
import { customerAdvance } from './ApiContainer';

//GET
export function getCustomerAdvance(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", customerAdvance, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_CUSTOMER_ADVANCE_SUCCESS',
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
          type: 'GET_CUSTOMER_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCustomerAdvance(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", customerAdvance, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_CUSTOMER_ADVANCE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_CUSTOMER_ADVANCE_SUCCESS',
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
          type: 'CREATE_CUSTOMER_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCustomerAdvance(request, customerAdvanceId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", customerAdvance +`/${customerAdvanceId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_CUSTOMER_ADVANCE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_CUSTOMER_ADVANCE_SUCCESS',
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
          type: 'UPDATE_CUSTOMER_ADVANCE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}