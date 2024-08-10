const initialState = {
    tankerEntryList: []  
  }
  
  const TankerEntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_TANKER_ENTRY_SUCCESS": {             
        return {
          ...state,
          getTankerEntrySuccess: true,
          getTankerEntryList: action.payload.data,
        };
      }
      case "GET_TANKER_ENTRY_FAILURE": {
        return {
          ...state,
          getTankerEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_TANKER_ENTRY": {
        return {
          ...state,
          getTankerEntrySuccess: false,
          getTankerEntryFailure: false,
          getTankerEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_TANKER_ENTRY_SUCCESS": {             
        return {
          ...state,
          createTankerEntrySuccess: true,
          createTankerEntryData: action.payload.data,
        };
      }
      case "CREATE_TANKER_ENTRY_FAILURE": {
        return {
          ...state,
          createTankerEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_TANKER_ENTRY": {
        return {
          ...state,
          createTankerEntrySuccess: false,
          createTankerEntryFailure: false,
          createTankerEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_TANKER_ENTRY_SUCCESS": {             
        return {
          ...state,
          updateTankerEntrySuccess: true,
          updateTankerEntryData: action.payload.data,
        };
      }
      case "UPDATE_TANKER_ENTRY_FAILURE": {
        return {
          ...state,
          updateTankerEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_TANKER_ENTRY": {
        return {
          ...state,
          updateTankerEntrySuccess: false,
          updateTankerEntryFailure: false,
          updateTankerEntryData: false,
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
  
  export default TankerEntryReducer
  
  