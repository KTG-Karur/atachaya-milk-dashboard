import { apiReturnCallBack } from './ApiConfig';
import { commissionSettings } from './ApiContainer';

//GET
export function getCommissionSettings(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", commissionSettings, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_COMMISSION_SETTINGS_SUCCESS',
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
          type: 'GET_COMMISSION_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createCommissionSettings(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", commissionSettings, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_COMMISSION_SETTINGS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_COMMISSION_SETTINGS_SUCCESS',
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
          type: 'CREATE_COMMISSION_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateCommissionSettings(request, commissionSettingsId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", commissionSettings +`/${commissionSettingsId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_COMMISSION_SETTINGS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_COMMISSION_SETTINGS_SUCCESS',
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
          type: 'UPDATE_COMMISSION_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}