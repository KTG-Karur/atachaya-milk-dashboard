import { apiReturnCallBack } from './ApiConfig';
import { dashboard } from './ApiContainer';

//GET
export function getDashboard(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", dashboard, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_DASHBOARD_SUCCESS',
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
          type: 'GET_DASHBOARD_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}