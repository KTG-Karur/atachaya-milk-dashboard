import { apiReturnCallBack } from './ApiConfig';
import { tankerSupplier } from './ApiContainer';

//GET
export function getTankerSupplier(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", tankerSupplier, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_TANKER_SUPPLIER_SUCCESS',
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
          type: 'GET_TANKER_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createTankerSupplier(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", tankerSupplier, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_TANKER_SUPPLIER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_TANKER_SUPPLIER_SUCCESS',
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
          type: 'CREATE_TANKER_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateTankerSupplier(request, tankerSupplierId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", tankerSupplier +`/${tankerSupplierId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_TANKER_SUPPLIER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_TANKER_SUPPLIER_SUCCESS',
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
          type: 'UPDATE_TANKER_SUPPLIER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}