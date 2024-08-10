const initialState = {
    stockTransferList: []  
  }
  
  const StockTransferReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_STOCK_TRANSFER_SUCCESS": {             
        return {
          ...state,
          getStockTransferSuccess: true,
          getStockTransferList: action.payload.data,
        };
      }
      case "GET_STOCK_TRANSFER_FAILURE": {
        return {
          ...state,
          getStockTransferFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_STOCK_TRANSFER": {
        return {
          ...state,
          getStockTransferSuccess: false,
          getStockTransferFailure: false,
          getStockTransferList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_STOCK_TRANSFER_SUCCESS": {             
        return {
          ...state,
          createStockTransferSuccess: true,
          createStockTransferData: action.payload.data,
        };
      }
      case "CREATE_STOCK_TRANSFER_FAILURE": {
        return {
          ...state,
          createStockTransferFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_STOCK_TRANSFER": {
        return {
          ...state,
          createStockTransferSuccess: false,
          createStockTransferFailure: false,
          createStockTransferData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_STOCK_TRANSFER_SUCCESS": {             
        return {
          ...state,
          updateStockTransferSuccess: true,
          updateStockTransferData: action.payload.data,
        };
      }
      case "UPDATE_STOCK_TRANSFER_FAILURE": {
        return {
          ...state,
          updateStockTransferFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_STOCK_TRANSFER": {
        return {
          ...state,
          updateStockTransferSuccess: false,
          updateStockTransferFailure: false,
          updateStockTransferData: false,
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
  
  export default StockTransferReducer
  
  