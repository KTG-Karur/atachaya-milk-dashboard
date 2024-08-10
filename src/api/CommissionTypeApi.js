import { apiReturnCallBack } from './ApiConfig';
import { commissionType } from './ApiContainer';

//GET
export function getCommissionType(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", commissionType, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_COMMISSION_TYPE_SUCCESS',
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
          type: 'GET_COMMISSION_TYPE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCommissionType(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", commissionType, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_COMMISSION_TYPE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_COMMISSION_TYPE_SUCCESS',
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
          type: 'CREATE_COMMISSION_TYPE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCommissionType(request, commissionTypeId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", commissionType +`/${commissionTypeId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_COMMISSION_TYPE_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_COMMISSION_TYPE_SUCCESS',
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
          type: 'UPDATE_COMMISSION_TYPE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}