const initialState = {
    purchaseList: []  
  }
  
  const PurchaseReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PURCHASE_SUCCESS": {             
        return {
          ...state,
          getPurchaseSuccess: true,
          getPurchaseList: action.payload.data,
        };
      }
      case "GET_PURCHASE_FAILURE": {
        return {
          ...state,
          getPurchaseFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PURCHASE": {
        return {
          ...state,
          getPurchaseSuccess: false,
          getPurchaseFailure: false,
          getPurchaseList: [],
          errorMessage: false
        };
      }

      case "GET_PURCHASE_DETAILS_SUCCESS": {             
        return {
          ...state,
          getPurchaseDetailsSuccess: true,
          getPurchaseDetailsList: action.payload.data,
        };
      }
      case "GET_PURCHASE_DETAILS_FAILURE": {
        return {
          ...state,
          getPurchaseDetailsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PURCHASE_DETAILS": {
        return {
          ...state,
          getPurchaseDetailsSuccess: false,
          getPurchaseDetailsFailure: false,
          getPurchaseDetailsList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PURCHASE_SUCCESS": {             
        return {
          ...state,
          createPurchaseSuccess: true,
          createPurchaseData: action.payload.data,
        };
      }
      case "CREATE_PURCHASE_FAILURE": {
        return {
          ...state,
          createPurchaseFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PURCHASE": {
        return {
          ...state,
          createPurchaseSuccess: false,
          createPurchaseFailure: false,
          createPurchaseData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PURCHASE_SUCCESS": {             
        return {
          ...state,
          updatePurchaseSuccess: true,
          updatePurchaseData: action.payload.data,
        };
      }
      case "UPDATE_PURCHASE_FAILURE": {
        return {
          ...state,
          updatePurchaseFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PURCHASE": {
        return {
          ...state,
          updatePurchaseSuccess: false,
          updatePurchaseFailure: false,
          updatePurchaseData: false,
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
  
  export default PurchaseReducer
  
  