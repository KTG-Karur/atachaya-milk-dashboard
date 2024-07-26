const initialState = {
    paymentModeList: []  
  }
  
  const PaymentModeReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PAYMENT_MODE_SUCCESS": {             
        return {
          ...state,
          getPaymentModeSuccess: true,
          getPaymentModeList: action.payload.data,
        };
      }
      case "GET_PAYMENT_MODE_FAILURE": {
        return {
          ...state,
          getPaymentModeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PAYMENT_MODE": {
        return {
          ...state,
          getPaymentModeSuccess: false,
          getPaymentModeFailure: false,
          getPaymentModeList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PAYMENT_MODE_SUCCESS": {             
        return {
          ...state,
          createPaymentModeSuccess: true,
          createPaymentModeData: action.payload.data,
        };
      }
      case "CREATE_PAYMENT_MODE_FAILURE": {
        return {
          ...state,
          createPaymentModeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PAYMENT_MODE": {
        return {
          ...state,
          createPaymentModeSuccess: false,
          createPaymentModeFailure: false,
          createPaymentModeData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PAYMENT_MODE_SUCCESS": {             
        return {
          ...state,
          updatePaymentModeSuccess: true,
          updatePaymentModeData: action.payload.data,
        };
      }
      case "UPDATE_PAYMENT_MODE_FAILURE": {
        return {
          ...state,
          updatePaymentModeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PAYMENT_MODE": {
        return {
          ...state,
          updatePaymentModeSuccess: false,
          updatePaymentModeFailure: false,
          updatePaymentModeData: false,
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
  
  export default PaymentModeReducer
  
  