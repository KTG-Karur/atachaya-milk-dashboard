const initialState = {
    customerAdvanceList: []  
  }
  
  const CustomerAdvanceReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_CUSTOMER_ADVANCE_SUCCESS": {             
        return {
          ...state,
          getCustomerAdvanceSuccess: true,
          getCustomerAdvanceList: action.payload.data,
        };
      }
      case "GET_CUSTOMER_ADVANCE_FAILURE": {
        return {
          ...state,
          getCustomerAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_CUSTOMER_ADVANCE": {
        return {
          ...state,
          getCustomerAdvanceSuccess: false,
          getCustomerAdvanceFailure: false,
          getCustomerAdvanceList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_CUSTOMER_ADVANCE_SUCCESS": {             
        return {
          ...state,
          createCustomerAdvanceSuccess: true,
          createCustomerAdvanceData: action.payload.data,
        };
      }
      case "CREATE_CUSTOMER_ADVANCE_FAILURE": {
        return {
          ...state,
          createCustomerAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_CUSTOMER_ADVANCE": {
        return {
          ...state,
          createCustomerAdvanceSuccess: false,
          createCustomerAdvanceFailure: false,
          createCustomerAdvanceData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_CUSTOMER_ADVANCE_SUCCESS": {             
        return {
          ...state,
          updateCustomerAdvanceSuccess: true,
          updateCustomerAdvanceData: action.payload.data,
        };
      }
      case "UPDATE_CUSTOMER_ADVANCE_FAILURE": {
        return {
          ...state,
          updateCustomerAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_CUSTOMER_ADVANCE": {
        return {
          ...state,
          updateCustomerAdvanceSuccess: false,
          updateCustomerAdvanceFailure: false,
          updateCustomerAdvanceData: false,
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
  
  export default CustomerAdvanceReducer
  
  