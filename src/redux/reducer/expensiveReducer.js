const initialState = {
    expensiveList: []  
  }
  
  const ExpensiveReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_EXPENSIVE_SUCCESS": {             
        return {
          ...state,
          getExpensiveSuccess: true,
          getExpensiveList: action.payload.data,
        };
      }
      case "GET_EXPENSIVE_FAILURE": {
        return {
          ...state,
          getExpensiveFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_EXPENSIVE": {
        return {
          ...state,
          getExpensiveSuccess: false,
          getExpensiveFailure: false,
          getExpensiveList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_EXPENSIVE_SUCCESS": {             
        return {
          ...state,
          createExpensiveSuccess: true,
          createExpensiveData: action.payload.data,
        };
      }
      case "CREATE_EXPENSIVE_FAILURE": {
        return {
          ...state,
          createExpensiveFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_EXPENSIVE": {
        return {
          ...state,
          createExpensiveSuccess: false,
          createExpensiveFailure: false,
          createExpensiveData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_EXPENSIVE_SUCCESS": {             
        return {
          ...state,
          updateExpensiveSuccess: true,
          updateExpensiveData: action.payload.data,
        };
      }
      case "UPDATE_EXPENSIVE_FAILURE": {
        return {
          ...state,
          updateExpensiveFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_EXPENSIVE": {
        return {
          ...state,
          updateExpensiveSuccess: false,
          updateExpensiveFailure: false,
          updateExpensiveData: false,
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
  
  export default ExpensiveReducer
  
  