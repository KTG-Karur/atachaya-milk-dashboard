const initialState = {
    employeeList: []  
  }
  
  const EmployeeReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_EMPLOYEE_SUCCESS": {             
        return {
          ...state,
          getEmployeeSuccess: true,
          getEmployeeList: action.payload.data,
        };
      }
      case "GET_EMPLOYEE_FAILURE": {
        return {
          ...state,
          getEmployeeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_EMPLOYEE": {
        return {
          ...state,
          getEmployeeSuccess: false,
          getEmployeeFailure: false,
          getEmployeeList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_EMPLOYEE_SUCCESS": {             
        return {
          ...state,
          createEmployeeSuccess: true,
          createEmployeeData: action.payload.data,
        };
      }
      case "CREATE_EMPLOYEE_FAILURE": {
        return {
          ...state,
          createEmployeeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_EMPLOYEE": {
        return {
          ...state,
          createEmployeeSuccess: false,
          createEmployeeFailure: false,
          createEmployeeData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_EMPLOYEE_SUCCESS": {             
        return {
          ...state,
          updateEmployeeSuccess: true,
          updateEmployeeData: action.payload.data,
        };
      }
      case "UPDATE_EMPLOYEE_FAILURE": {
        return {
          ...state,
          updateEmployeeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_EMPLOYEE": {
        return {
          ...state,
          updateEmployeeSuccess: false,
          updateEmployeeFailure: false,
          updateEmployeeData: false,
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
  
  export default EmployeeReducer
  
  