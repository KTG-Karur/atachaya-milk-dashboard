import { apiReturnCallBack } from './ApiConfig';
import { feedEntry } from './ApiContainer';

//GET
export function getFeedEntry(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", feedEntry, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_FEED_ENTRY_SUCCESS',
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
          type: 'GET_FEED_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createFeedEntry(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", feedEntry, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_FEED_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_FEED_ENTRY_SUCCESS',
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
          type: 'CREATE_FEED_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateFeedEntry(request, feedEntryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", feedEntry +`/${feedEntryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_FEED_ENTRY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_FEED_ENTRY_SUCCESS',
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
          type: 'UPDATE_FEED_ENTRY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}