const initialState = {
    transportEntryList: []  
  }
  
  const TransportEntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_TRANSPORT_ENTRY_SUCCESS": {             
        return {
          ...state,
          getTransportEntrySuccess: true,
          getTransportEntryList: action.payload.data,
        };
      }
      case "GET_TRANSPORT_ENTRY_FAILURE": {
        return {
          ...state,
          getTransportEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_TRANSPORT_ENTRY": {
        return {
          ...state,
          getTransportEntrySuccess: false,
          getTransportEntryFailure: false,
          getTransportEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_TRANSPORT_ENTRY_SUCCESS": {             
        return {
          ...state,
          createTransportEntrySuccess: true,
          createTransportEntryData: action.payload.data,
        };
      }
      case "CREATE_TRANSPORT_ENTRY_FAILURE": {
        return {
          ...state,
          createTransportEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_TRANSPORT_ENTRY": {
        return {
          ...state,
          createTransportEntrySuccess: false,
          createTransportEntryFailure: false,
          createTransportEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_TRANSPORT_ENTRY_SUCCESS": {             
        return {
          ...state,
          updateTransportEntrySuccess: true,
          updateTransportEntryData: action.payload.data,
        };
      }
      case "UPDATE_TRANSPORT_ENTRY_FAILURE": {
        return {
          ...state,
          updateTransportEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_TRANSPORT_ENTRY": {
        return {
          ...state,
          updateTransportEntrySuccess: false,
          updateTransportEntryFailure: false,
          updateTransportEntryData: false,
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
  
  export default TransportEntryReducer
  
  