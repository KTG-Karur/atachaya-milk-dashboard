import { apiReturnCallBack } from './ApiConfig';
import { pages } from './ApiContainer';

//GET
export function getPages(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", pages, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_PAGES_SUCCESS',
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
          type: 'GET_PAGES_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}