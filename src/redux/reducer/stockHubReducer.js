const initialState = {
    stockHubList: []  
  }
  
  const StockHubReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_STOCK_HUB_SUCCESS": {             
        return {
          ...state,
          getStockHubSuccess: true,
          getStockHubList: action.payload.data,
        };
      }
      case "GET_STOCK_HUB_FAILURE": {
        return {
          ...state,
          getStockHubFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_STOCK_HUB": {
        return {
          ...state,
          getStockHubSuccess: false,
          getStockHubFailure: false,
          getStockHubList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_STOCK_HUB_SUCCESS": {             
        return {
          ...state,
          createStockHubSuccess: true,
          createStockHubData: action.payload.data,
        };
      }
      case "CREATE_STOCK_HUB_FAILURE": {
        return {
          ...state,
          createStockHubFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_STOCK_HUB": {
        return {
          ...state,
          createStockHubSuccess: false,
          createStockHubFailure: false,
          createStockHubData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_STOCK_HUB_SUCCESS": {             
        return {
          ...state,
          updateStockHubSuccess: true,
          updateStockHubData: action.payload.data,
        };
      }
      case "UPDATE_STOCK_HUB_FAILURE": {
        return {
          ...state,
          updateStockHubFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_STOCK_HUB": {
        return {
          ...state,
          updateStockHubSuccess: false,
          updateStockHubFailure: false,
          updateStockHubData: false,
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
  
  export default StockHubReducer
  
  