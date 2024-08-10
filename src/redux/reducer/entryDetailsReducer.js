const initialState = {
    entryDetailsList: []  
  }
  
  const EntryDetailsReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_ENTRY_DETAILS_SUCCESS": {             
        return {
          ...state,
          getEntryDetailsSuccess: true,
          getEntryDetailsList: action.payload.data,
        };
      }
      case "GET_ENTRY_DETAILS_FAILURE": {
        return {
          ...state,
          getEntryDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_ENTRY_DETAILS": {
        return {
          ...state,
          getEntryDetailsSuccess: false,
          getEntryDetailsFailure: false,
          getEntryDetailsList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_ENTRY_DETAILS_SUCCESS": {             
        return {
          ...state,
          createEntryDetailsSuccess: true,
          createEntryDetailsData: action.payload.data,
        };
      }
      case "CREATE_ENTRY_DETAILS_FAILURE": {
        return {
          ...state,
          createEntryDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_ENTRY_DETAILS": {
        return {
          ...state,
          createEntryDetailsSuccess: false,
          createEntryDetailsFailure: false,
          createEntryDetailsData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_ENTRY_DETAILS_SUCCESS": {             
        return {
          ...state,
          updateEntryDetailsSuccess: true,
          updateEntryDetailsData: action.payload.data,
        };
      }
      case "UPDATE_ENTRY_DETAILS_FAILURE": {
        return {
          ...state,
          updateEntryDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_ENTRY_DETAILS": {
        return {
          ...state,
          updateEntryDetailsSuccess: false,
          updateEntryDetailsFailure: false,
          updateEntryDetailsData: false,
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
  
  export default EntryDetailsReducer
  
  