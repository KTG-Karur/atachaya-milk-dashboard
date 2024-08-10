const initialState = {
    entryList: []  
  }
  
  const EntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_ENTRY_SUCCESS": {             
        return {
          ...state,
          getEntrySuccess: true,
          getEntryList: action.payload.data,
        };
      }
      case "GET_ENTRY_FAILURE": {
        return {
          ...state,
          getEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_ENTRY": {
        return {
          ...state,
          getEntrySuccess: false,
          getEntryFailure: false,
          getEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_ENTRY_SUCCESS": {             
        return {
          ...state,
          createEntrySuccess: true,
          createEntryData: action.payload.data,
        };
      }
      case "CREATE_ENTRY_FAILURE": {
        return {
          ...state,
          createEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_ENTRY": {
        return {
          ...state,
          createEntrySuccess: false,
          createEntryFailure: false,
          createEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_ENTRY_SUCCESS": {             
        return {
          ...state,
          updateEntrySuccess: true,
          updateEntryData: action.payload.data,
        };
      }
      case "UPDATE_ENTRY_FAILURE": {
        return {
          ...state,
          updateEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_ENTRY": {
        return {
          ...state,
          updateEntrySuccess: false,
          updateEntryFailure: false,
          updateEntryData: false,
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
  
  export default EntryReducer
  
  