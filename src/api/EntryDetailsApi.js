import { apiReturnCallBack } from './ApiConfig';
import { entryDetails } from './ApiContainer';

//GET
export function getEntryDetails(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", entryDetails, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_ENTRY_DETAILS_SUCCESS',
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
          type: 'GET_ENTRY_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createEntryDetails(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", entryDetails, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_ENTRY_DETAILS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_ENTRY_DETAILS_SUCCESS',
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
          type: 'CREATE_ENTRY_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateEntryDetails(request, entryDetailsId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", entryDetails , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_ENTRY_DETAILS_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_ENTRY_DETAILS_SUCCESS',
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
          type: 'UPDATE_ENTRY_DETAILS_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}