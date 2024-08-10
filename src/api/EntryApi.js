import { apiReturnCallBack } from './ApiConfig';
import { entry } from './ApiContainer';

//GET
export function getEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", entry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_ENTRY_SUCCESS',
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
          type: 'GET_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", entry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_ENTRY_SUCCESS',
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
          type: 'CREATE_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateEntry(request, entryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", entry +`/${entryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_ENTRY_SUCCESS',
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
          type: 'UPDATE_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}