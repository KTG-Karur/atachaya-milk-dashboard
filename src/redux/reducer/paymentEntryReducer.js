const initialState = {
    paymentEntryList: []  
  }
  
  const PaymentEntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          getPaymentEntrySuccess: true,
          getPaymentEntryList: action.payload.data,
        };
      }
      case "GET_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          getPaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PAYMENT_ENTRY": {
        return {
          ...state,
          getPaymentEntrySuccess: false,
          getPaymentEntryFailure: false,
          getPaymentEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          createPaymentEntrySuccess: true,
          createPaymentEntryData: action.payload.data,
        };
      }
      case "CREATE_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          createPaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PAYMENT_ENTRY": {
        return {
          ...state,
          createPaymentEntrySuccess: false,
          createPaymentEntryFailure: false,
          createPaymentEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PAYMENT_ENTRY_SUCCESS": {             
        return {
          ...state,
          updatePaymentEntrySuccess: true,
          updatePaymentEntryData: action.payload.data,
        };
      }
      case "UPDATE_PAYMENT_ENTRY_FAILURE": {
        return {
          ...state,
          updatePaymentEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PAYMENT_ENTRY": {
        return {
          ...state,
          updatePaymentEntrySuccess: false,
          updatePaymentEntryFailure: false,
          updatePaymentEntryData: false,
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
  
  export default PaymentEntryReducer
  
  