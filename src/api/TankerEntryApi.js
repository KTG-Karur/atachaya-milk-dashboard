import { apiReturnCallBack } from './ApiConfig';
import { tankerEntry } from './ApiContainer';

//GET
export function getTankerEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", tankerEntry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_TANKER_ENTRY_SUCCESS',
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
          type: 'GET_TANKER_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createTankerEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", tankerEntry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_TANKER_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_TANKER_ENTRY_SUCCESS',
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
          type: 'CREATE_TANKER_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateTankerEntry(request, tankerEntryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", tankerEntry +`/${tankerEntryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_TANKER_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_TANKER_ENTRY_SUCCESS',
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
          type: 'UPDATE_TANKER_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}