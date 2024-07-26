const initialState = {
    quotationList: []  
  }
  
  const QuotationReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_QUOTATION_SUCCESS": {             
        return {
          ...state,
          getQuotationSuccess: true,
          getQuotationList: action.payload.data,
        };
      }
      case "GET_QUOTATION_FAILURE": {
        return {
          ...state,
          getQuotationFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_QUOTATION": {
        return {
          ...state,
          getQuotationSuccess: false,
          getQuotationFailure: false,
          getQuotationList: [],
          errorMessage: false
        };
      }
      
      case "GET_QUOTATION_DETAILS_SUCCESS": {             
        return {
          ...state,
          getQuotationDetailsSuccess: true,
          getQuotationDetailsList: action.payload.data,
        };
      }
      case "GET_QUOTATION_DETAILS_FAILURE": {
        return {
          ...state,
          getQuotationDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_QUOTATION_DETAILS": {
        return {
          ...state,
          getQuotationDetailsSuccess: false,
          getQuotationDetailsFailure: false,
          getQuotationDetailsList: [],
          errorMessage: false
        };
      }

      case "CREATE_QUOTATION_SUCCESS": {             
        return {
          ...state,
          createQuotationSuccess: true,
          createQuotationData: action.payload.data,
        };
      }
      case "CREATE_QUOTATION_FAILURE": {
        return {
          ...state,
          createQuotationFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_QUOTATION": {
        return {
          ...state,
          createQuotationSuccess: false,
          createQuotationFailure: false,
          createQuotationData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_QUOTATION_SUCCESS": {             
        return {
          ...state,
          updateQuotationSuccess: true,
          updateQuotationData: action.payload.data,
        };
      }
      case "UPDATE_QUOTATION_FAILURE": {
        return {
          ...state,
          updateQuotationFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_QUOTATION": {
        return {
          ...state,
          updateQuotationSuccess: false,
          updateQuotationFailure: false,
          updateQuotationData: false,
          errorMessage: false         
        };
      }
  
      case "DELETE_ORDER_PRODUCT_SUCCESS": {             
        return {
          ...state,
          deleteOrderProductSuccess: true,
          deleteOrderProductData: action.payload.data,
        };
      }
      case "DELETE_ORDER_PRODUCT_FAILURE": {
        return {
          ...state,
          deleteOrderProductFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_DELETE_ORDER_PRODUCT": {
        return {
          ...state,
          deleteOrderProductSuccess: false,
          deleteOrderProductFailure: false,
          deleteOrderProductData: false,
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
  
  export default QuotationReducer
  
  