const initialState = {
    quotationStatusList: []  
  }
  
  const QuotationStatusReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_QUOTATION_STATUS_SUCCESS": {             
        return {
          ...state,
          getQuotationStatusSuccess: true,
          getQuotationStatusList: action.payload.data,
        };
      }
      case "GET_QUOTATION_STATUS_FAILURE": {
        return {
          ...state,
          getQuotationStatusFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_QUOTATION_STATUS": {
        return {
          ...state,
          getQuotationStatusSuccess: false,
          getQuotationStatusFailure: false,
          getQuotationStatusList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_QUOTATION_STATUS_SUCCESS": {             
        return {
          ...state,
          createQuotationStatusSuccess: true,
          createQuotationStatusData: action.payload.data,
        };
      }
      case "CREATE_QUOTATION_STATUS_FAILURE": {
        return {
          ...state,
          createQuotationStatusFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_QUOTATION_STATUS": {
        return {
          ...state,
          createQuotationStatusSuccess: false,
          createQuotationStatusFailure: false,
          createQuotationStatusData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_QUOTATION_STATUS_SUCCESS": {             
        return {
          ...state,
          updateQuotationStatusSuccess: true,
          updateQuotationStatusData: action.payload.data,
        };
      }
      case "UPDATE_QUOTATION_STATUS_FAILURE": {
        return {
          ...state,
          updateQuotationStatusFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_QUOTATION_STATUS": {
        return {
          ...state,
          updateQuotationStatusSuccess: false,
          updateQuotationStatusFailure: false,
          updateQuotationStatusData: false,
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
  
  export default QuotationStatusReducer
  
  