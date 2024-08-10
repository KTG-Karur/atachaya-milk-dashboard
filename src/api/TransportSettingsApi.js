import { apiReturnCallBack } from './ApiConfig';
import { transportSettings } from './ApiContainer';

//GET
export function getTransportSettings(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", transportSettings, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_TRANSPORT_SETTINGS_SUCCESS',
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
          type: 'GET_TRANSPORT_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createTransportSettings(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", transportSettings, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_TRANSPORT_SETTINGS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_TRANSPORT_SETTINGS_SUCCESS',
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
          type: 'CREATE_TRANSPORT_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateTransportSettings(request, transportSettingsId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", transportSettings +`/${transportSettingsId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_TRANSPORT_SETTINGS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_TRANSPORT_SETTINGS_SUCCESS',
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
          type: 'UPDATE_TRANSPORT_SETTINGS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}