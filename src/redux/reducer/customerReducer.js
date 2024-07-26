const initialState = {
    customerList: []  
  }
  
  const CustomerReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_CUSTOMER_SUCCESS": {             
        return {
          ...state,
          getCustomerSuccess: true,
          getCustomerList: action.payload.data,
        };
      }
      case "GET_CUSTOMER_FAILURE": {
        return {
          ...state,
          getCustomerFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_CUSTOMER": {
        return {
          ...state,
          getCustomerSuccess: false,
          getCustomerFailure: false,
          getCustomerList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_CUSTOMER_SUCCESS": {             
        return {
          ...state,
          createCustomerSuccess: true,
          createCustomerData: action.payload.data,
        };
      }
      case "CREATE_CUSTOMER_FAILURE": {
        return {
          ...state,
          createCustomerFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_CUSTOMER": {
        return {
          ...state,
          createCustomerSuccess: false,
          createCustomerFailure: false,
          createCustomerData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_CUSTOMER_SUCCESS": {             
        return {
          ...state,
          updateCustomerSuccess: true,
          updateCustomerData: action.payload.data,
        };
      }
      case "UPDATE_CUSTOMER_FAILURE": {
        return {
          ...state,
          updateCustomerFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_CUSTOMER": {
        return {
          ...state,
          updateCustomerSuccess: false,
          updateCustomerFailure: false,
          updateCustomerData: false,
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
  
  export default CustomerReducer
  
  