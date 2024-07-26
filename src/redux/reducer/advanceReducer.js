const initialState = {
    advanceList: []  
  }
  
  const AdvanceReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_ADVANCE_SUCCESS": {             
        return {
          ...state,
          getAdvanceSuccess: true,
          getAdvanceList: action.payload.data,
        };
      }
      case "GET_ADVANCE_FAILURE": {
        return {
          ...state,
          getAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_ADVANCE": {
        return {
          ...state,
          getAdvanceSuccess: false,
          getAdvanceFailure: false,
          getAdvanceList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_ADVANCE_SUCCESS": {             
        return {
          ...state,
          createAdvanceSuccess: true,
          createAdvanceData: action.payload.data,
        };
      }
      case "CREATE_ADVANCE_FAILURE": {
        return {
          ...state,
          createAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_ADVANCE": {
        return {
          ...state,
          createAdvanceSuccess: false,
          createAdvanceFailure: false,
          createAdvanceData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_ADVANCE_SUCCESS": {             
        return {
          ...state,
          updateAdvanceSuccess: true,
          updateAdvanceData: action.payload.data,
        };
      }
      case "UPDATE_ADVANCE_FAILURE": {
        return {
          ...state,
          updateAdvanceFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_ADVANCE": {
        return {
          ...state,
          updateAdvanceSuccess: false,
          updateAdvanceFailure: false,
          updateAdvanceData: false,
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
  
  export default AdvanceReducer
  
  