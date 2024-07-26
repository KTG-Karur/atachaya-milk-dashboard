import { apiReturnCallBack } from './ApiConfig';
import { quotationReport, salesReport } from './ApiContainer';

//GET
export function getQuotationReport(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", quotationReport, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_QUOTATION_REPORT_SUCCESS',
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
          type: 'GET_QUOTATION_REPORT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}

//GET
export function getSalesReport(request) {
  const requestObj = request ? { params: request } : "";
  return (dispatch) => {
    apiReturnCallBack("GET", salesReport, requestObj)
      .then(response => {
        dispatch({
          type: 'GET_SALES_REPORT_SUCCESS',
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
          type: 'GET_SALES_REPORT_FAILURE',
          errorMessage: errorMessage
        })
      })
  }
}