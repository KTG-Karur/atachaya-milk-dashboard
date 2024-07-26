const initialState = {
    quotationReportList: []  
  }
  
  const QuotationReportReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_QUOTATION_REPORT_SUCCESS": {             
        return {
          ...state,
          getQuotationReportSuccess: true,
          getQuotationReportList: action.payload.data,
        };
      }
      case "GET_QUOTATION_REPORT_FAILURE": {
        return {
          ...state,
          getQuotationReportFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_QUOTATION_REPORT": {
        return {
          ...state,
          getQuotationReportSuccess: false,
          getQuotationReportFailure: false,
          getQuotationReportList: [],
          errorMessage: false
        };
      }

      case "GET_SALES_REPORT_SUCCESS": {             
        return {
          ...state,
          getSalesReportSuccess: true,
          getSalesReportList: action.payload.data,
        };
      }
      case "GET_SALES_REPORT_FAILURE": {
        return {
          ...state,
          getSalesReportFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_SALES_REPORT": {
        return {
          ...state,
          getSalesReportSuccess: false,
          getSalesReportFailure: false,
          getSalesReportList: [],
          errorMessage: false
        };
      }
      
      default: {
        return {
          ...state,
        }
      }
    }
  }
  
  export default QuotationReportReducer
  
  