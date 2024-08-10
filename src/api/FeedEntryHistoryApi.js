import { apiReturnCallBack } from './ApiConfig';
import { feedEntryHistory } from './ApiContainer';

//GET
export function getFeedEntryHistory(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", feedEntryHistory, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_FEED_ENTRY_HISTORY_SUCCESS',
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
          type: 'GET_FEED_ENTRY_HISTORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createFeedEntryHistory(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", feedEntryHistory, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_FEED_ENTRY_HISTORY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_FEED_ENTRY_HISTORY_SUCCESS',
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
          type: 'CREATE_FEED_ENTRY_HISTORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateFeedEntryHistory(request, feedEntryHistoryId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", feedEntryHistory +`/${feedEntryHistoryId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_FEED_ENTRY_HISTORY_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_FEED_ENTRY_HISTORY_SUCCESS',
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
          type: 'UPDATE_FEED_ENTRY_HISTORY_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}