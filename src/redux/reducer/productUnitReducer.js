const initialState = {
    productUnitList: []  
  }
  
  const ProductUnitReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PRODUCT_UNIT_SUCCESS": {             
        return {
          ...state,
          getProductUnitSuccess: true,
          getProductUnitList: action.payload.data,
        };
      }
      case "GET_PRODUCT_UNIT_FAILURE": {
        return {
          ...state,
          getProductUnitFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PRODUCT_UNIT": {
        return {
          ...state,
          getProductUnitSuccess: false,
          getProductUnitFailure: false,
          getProductUnitList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PRODUCT_UNIT_SUCCESS": {             
        return {
          ...state,
          createProductUnitSuccess: true,
          createProductUnitData: action.payload.data,
        };
      }
      case "CREATE_PRODUCT_UNIT_FAILURE": {
        return {
          ...state,
          createProductUnitFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PRODUCT_UNIT": {
        return {
          ...state,
          createProductUnitSuccess: false,
          createProductUnitFailure: false,
          createProductUnitData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PRODUCT_UNIT_SUCCESS": {             
        return {
          ...state,
          updateProductUnitSuccess: true,
          updateProductUnitData: action.payload.data,
        };
      }
      case "UPDATE_PRODUCT_UNIT_FAILURE": {
        return {
          ...state,
          updateProductUnitFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PRODUCT_UNIT": {
        return {
          ...state,
          updateProductUnitSuccess: false,
          updateProductUnitFailure: false,
          updateProductUnitData: false,
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
  
  export default ProductUnitReducer
  
  