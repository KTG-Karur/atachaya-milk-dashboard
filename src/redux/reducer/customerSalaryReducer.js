const initialState = {
    customerSalaryList: []  
  }
  
  const CustomerSalaryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_CUSTOMER_SALARY_SUCCESS": {             
        return {
          ...state,
          getCustomerSalarySuccess: true,
          getCustomerSalaryList: action.payload.data,
        };
      }
      case "GET_CUSTOMER_SALARY_FAILURE": {
        return {
          ...state,
          getCustomerSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_CUSTOMER_SALARY": {
        return {
          ...state,
          getCustomerSalarySuccess: false,
          getCustomerSalaryFailure: false,
          getCustomerSalaryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_CUSTOMER_SALARY_SUCCESS": {             
        return {
          ...state,
          createCustomerSalarySuccess: true,
          createCustomerSalaryData: action.payload.data,
        };
      }
      case "CREATE_CUSTOMER_SALARY_FAILURE": {
        return {
          ...state,
          createCustomerSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_CUSTOMER_SALARY": {
        return {
          ...state,
          createCustomerSalarySuccess: false,
          createCustomerSalaryFailure: false,
          createCustomerSalaryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_CUSTOMER_SALARY_SUCCESS": {             
        return {
          ...state,
          updateCustomerSalarySuccess: true,
          updateCustomerSalaryData: action.payload.data,
        };
      }
      case "UPDATE_CUSTOMER_SALARY_FAILURE": {
        return {
          ...state,
          updateCustomerSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_CUSTOMER_SALARY": {
        return {
          ...state,
          updateCustomerSalarySuccess: false,
          updateCustomerSalaryFailure: false,
          updateCustomerSalaryData: false,
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
  
  export default CustomerSalaryReducer
  
  