import { apiReturnCallBack } from './ApiConfig';
import { quotationStatus } from './ApiContainer';

//GET
export function getQuotationStatus(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", quotationStatus, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_QUOTATION_STATUS_SUCCESS',
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
          type: 'GET_QUOTATION_STATUS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createQuotationStatus(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", quotationStatus, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_QUOTATION_STATUS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_QUOTATION_STATUS_SUCCESS',
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
          type: 'CREATE_QUOTATION_STATUS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateQuotationStatus(request, quotationStatusId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", quotationStatus +`/${quotationStatusId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_QUOTATION_STATUS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_QUOTATION_STATUS_SUCCESS',
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
          type: 'UPDATE_QUOTATION_STATUS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}