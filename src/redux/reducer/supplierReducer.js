const initialState = {
    supplierList: []  
  }
  
  const SupplierReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          getSupplierSuccess: true,
          getSupplierList: action.payload.data,
        };
      }
      case "GET_SUPPLIER_FAILURE": {
        return {
          ...state,
          getSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_SUPPLIER": {
        return {
          ...state,
          getSupplierSuccess: false,
          getSupplierFailure: false,
          getSupplierList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          createSupplierSuccess: true,
          createSupplierData: action.payload.data,
        };
      }
      case "CREATE_SUPPLIER_FAILURE": {
        return {
          ...state,
          createSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_SUPPLIER": {
        return {
          ...state,
          createSupplierSuccess: false,
          createSupplierFailure: false,
          createSupplierData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_SUPPLIER_SUCCESS": {             
        return {
          ...state,
          updateSupplierSuccess: true,
          updateSupplierData: action.payload.data,
        };
      }
      case "UPDATE_SUPPLIER_FAILURE": {
        return {
          ...state,
          updateSupplierFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_SUPPLIER": {
        return {
          ...state,
          updateSupplierSuccess: false,
          updateSupplierFailure: false,
          updateSupplierData: false,
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
  
  export default SupplierReducer
  
  