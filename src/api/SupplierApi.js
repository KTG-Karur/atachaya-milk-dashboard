import { apiReturnCallBack } from './ApiConfig';
import { supplier } from './ApiContainer';

//GET
export function getSupplier(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", supplier, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_SUPPLIER_SUCCESS',
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
          type: 'GET_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createSupplier(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", supplier, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_SUPPLIER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_SUPPLIER_SUCCESS',
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
          type: 'CREATE_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateSupplier(request, supplierId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", supplier +`/${supplierId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_SUPPLIER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_SUPPLIER_SUCCESS',
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
          type: 'UPDATE_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}