import { apiReturnCallBack } from './ApiConfig';
import { quotation, quotationDetails, deleteOrderProduct } from './ApiContainer';

//GET
export function getQuotation(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", quotation, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_QUOTATION_SUCCESS',
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
          type: 'GET_QUOTATION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}
//GET
export function getQuotationDetails(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", quotationDetails, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_QUOTATION_DETAILS_SUCCESS',
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
          type: 'GET_QUOTATION_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createQuotation(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", quotation, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_QUOTATION_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_QUOTATION_SUCCESS',
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
          type: 'CREATE_QUOTATION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateQuotation(request, quotationId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", quotation +`/${quotationId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_QUOTATION_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_QUOTATION_SUCCESS',
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
          type: 'UPDATE_QUOTATION_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function deleteOrderProductQuotation(request, orderProductId) {
  return (dispatch) => {
    apiReturnCallBack("DELETE", deleteOrderProduct +`/${orderProductId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'DELETE_ORDER_PRODUCT_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'DELETE_ORDER_PRODUCT_SUCCESS',
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
          type: 'DELETE_ORDER_PRODUCT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}