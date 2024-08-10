const initialState = {
    tankerSupplierList: []  
  }
  
  const TankerSupplierReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_TANKER_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          getTankerSupplierSuccess: true,
          getTankerSupplierList: action.payload.data,
        };
      }
      case "GET_TANKER_SUPPLIER_FAILURE": {
        return {
          ...state,
          getTankerSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_TANKER_SUPPLIER": {
        return {
          ...state,
          getTankerSupplierSuccess: false,
          getTankerSupplierFailure: false,
          getTankerSupplierList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_TANKER_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          createTankerSupplierSuccess: true,
          createTankerSupplierData: action.payload.data,
        };
      }
      case "CREATE_TANKER_SUPPLIER_FAILURE": {
        return {
          ...state,
          createTankerSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_TANKER_SUPPLIER": {
        return {
          ...state,
          createTankerSupplierSuccess: false,
          createTankerSupplierFailure: false,
          createTankerSupplierData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_TANKER_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          updateTankerSupplierSuccess: true,
          updateTankerSupplierData: action.payload.data,
        };
      }
      case "UPDATE_TANKER_SUPPLIER_FAILURE": {
        return {
          ...state,
          updateTankerSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_TANKER_SUPPLIER": {
        return {
          ...state,
          updateTankerSupplierSuccess: false,
          updateTankerSupplierFailure: false,
          updateTankerSupplierData: false,
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
  
  export default TankerSupplierReducer
  
  