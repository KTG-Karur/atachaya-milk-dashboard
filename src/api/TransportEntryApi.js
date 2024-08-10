import { apiReturnCallBack } from './ApiConfig';
import { transportEntry } from './ApiContainer';

//GET
export function getTransportEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", transportEntry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_TRANSPORT_ENTRY_SUCCESS',
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
          type: 'GET_TRANSPORT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createTransportEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", transportEntry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_TRANSPORT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_TRANSPORT_ENTRY_SUCCESS',
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
          type: 'CREATE_TRANSPORT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateTransportEntry(request, transportEntryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", transportEntry +`/${transportEntryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_TRANSPORT_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_TRANSPORT_ENTRY_SUCCESS',
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
          type: 'UPDATE_TRANSPORT_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}