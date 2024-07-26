const initialState = {
    customerCategoryList: []  
  }
  
  const CustomerCategoryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_CUSTOMER_CATEGORY_SUCCESS": {             
        return {
          ...state,
          getCustomerCategorySuccess: true,
          getCustomerCategoryList: action.payload.data,
        };
      }
      case "GET_CUSTOMER_CATEGORY_FAILURE": {
        return {
          ...state,
          getCustomerCategoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_CUSTOMER_CATEGORY": {
        return {
          ...state,
          getCustomerCategorySuccess: false,
          getCustomerCategoryFailure: false,
          getCustomerCategoryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_CUSTOMER_CATEGORY_SUCCESS": {             
        return {
          ...state,
          createCustomerCategorySuccess: true,
          createCustomerCategoryData: action.payload.data,
        };
      }
      case "CREATE_CUSTOMER_CATEGORY_FAILURE": {
        return {
          ...state,
          createCustomerCategoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_CUSTOMER_CATEGORY": {
        return {
          ...state,
          createCustomerCategorySuccess: false,
          createCustomerCategoryFailure: false,
          createCustomerCategoryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_CUSTOMER_CATEGORY_SUCCESS": {             
        return {
          ...state,
          updateCustomerCategorySuccess: true,
          updateCustomerCategoryData: action.payload.data,
        };
      }
      case "UPDATE_CUSTOMER_CATEGORY_FAILURE": {
        return {
          ...state,
          updateCustomerCategoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_CUSTOMER_CATEGORY": {
        return {
          ...state,
          updateCustomerCategorySuccess: false,
          updateCustomerCategoryFailure: false,
          updateCustomerCategoryData: false,
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
  
  export default CustomerCategoryReducer
  
  