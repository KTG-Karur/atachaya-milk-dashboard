const initialState = {
    newPaymentEntryList: []  
  }
  
  const NewPaymentEntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_NEW_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          getNewPaymentEntrySuccess: true,
          getNewPaymentEntryList: action.payload.data,
        };
      }
      case "GET_NEW_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          getNewPaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_NEW_PAYMENT_ENTRY": {
        return {
          ...state,
          getNewPaymentEntrySuccess: false,
          getNewPaymentEntryFailure: false,
          getNewPaymentEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_NEW_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          createNewPaymentEntrySuccess: true,
          createNewPaymentEntryData: action.payload.data,
        };
      }
      case "CREATE_NEW_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          createNewPaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_NEW_PAYMENT_ENTRY": {
        return {
          ...state,
          createNewPaymentEntrySuccess: false,
          createNewPaymentEntryFailure: false,
          createNewPaymentEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_NEW_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          updateNewPaymentEntrySuccess: true,
          updateNewPaymentEntryData: action.payload.data,
        };
      }
      case "UPDATE_NEW_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          updateNewPaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_NEW_PAYMENT_ENTRY": {
        return {
          ...state,
          updateNewPaymentEntrySuccess: false,
          updateNewPaymentEntryFailure: false,
          updateNewPaymentEntryData: false,
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
  
  export default NewPaymentEntryReducer
  
  