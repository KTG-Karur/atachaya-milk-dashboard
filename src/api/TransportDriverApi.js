import { apiReturnCallBack } from './ApiConfig';
import { transportDriver } from './ApiContainer';

//GET
export function getTransportDriver(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", transportDriver, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_TRANSPORT_DRIVER_SUCCESS',
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
          type: 'GET_TRANSPORT_DRIVER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//POST
export function createTransportDriver(request) {

  return (dispatch) => {
    apiReturnCallBack("POST", transportDriver, request)
      .then(response => {
        if (response.data.error) {
          dispatch({
            type: 'CREATE_TRANSPORT_DRIVER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'CREATE_TRANSPORT_DRIVER_SUCCESS',
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
          type: 'CREATE_TRANSPORT_DRIVER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

export function updateTransportDriver(request, transportDriverId) {
  return (dispatch) => {
    apiReturnCallBack("PUT", transportDriver +`/${transportDriverId}` , request)
      .then(response => {

        if (response.data.error) {
          dispatch({
            type: 'UPDATE_TRANSPORT_DRIVER_FAILURE',
            errorMessage: response.data.message
          })
        } else {
          dispatch({
            type: 'UPDATE_TRANSPORT_DRIVER_SUCCESS',
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
          type: 'UPDATE_TRANSPORT_DRIVER_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}