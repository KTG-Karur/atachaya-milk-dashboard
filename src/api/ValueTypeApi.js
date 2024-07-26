import { apiReturnCallBack } from './ApiConfig';
import { valueType } from './ApiContainer';

//GET
export function getValueType(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", valueType, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_VALUE_TYPE_SUCCESS',
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
          type: 'GET_VALUE_TYPE_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}