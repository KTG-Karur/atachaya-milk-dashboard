const initialState = {
    salaryList: []  
  }
  
  const SalaryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_SALARY_SUCCESS": {             
        return {
          ...state,
          getSalarySuccess: true,
          getSalaryList: action.payload.data,
        };
      }
      case "GET_SALARY_FAILURE": {
        return {
          ...state,
          getSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_SALARY": {
        return {
          ...state,
          getSalarySuccess: false,
          getSalaryFailure: false,
          getSalaryList: [],
          errorMessage: false
        };
      }

      case "GET_SALARY_ENTRY_DETAILS_SUCCESS": {             
        return {
          ...state,
          getSalaryEntryDetailsSuccess: true,
          getSalaryEntryDetailsList: action.payload.data,
        };
      }
      case "GET_SALARY_ENTRY_DETAILS_FAILURE": {
        return {
          ...state,
          getSalaryEntryDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_SALARY_ENTRY_DETAILS": {
        return {
          ...state,
          getSalaryEntryDetailsSuccess: false,
          getSalaryEntryDetailsFailure: false,
          getSalaryEntryDetailsList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_SALARY_SUCCESS": {             
        return {
          ...state,
          createSalarySuccess: true,
          createSalaryData: action.payload.data,
        };
      }
      case "CREATE_SALARY_FAILURE": {
        return {
          ...state,
          createSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_SALARY": {
        return {
          ...state,
          createSalarySuccess: false,
          createSalaryFailure: false,
          createSalaryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_SALARY_SUCCESS": {             
        return {
          ...state,
          updateSalarySuccess: true,
          updateSalaryData: action.payload.data,
        };
      }
      case "UPDATE_SALARY_FAILURE": {
        return {
          ...state,
          updateSalaryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_SALARY": {
        return {
          ...state,
          updateSalarySuccess: false,
          updateSalaryFailure: false,
          updateSalaryData: false,
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
  
  export default SalaryReducer
  
  