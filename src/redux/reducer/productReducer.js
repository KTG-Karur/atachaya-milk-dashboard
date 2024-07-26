const initialState = {
    productList: []  
  }
  
  const ProductReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PRODUCT_SUCCESS": {             
        return {
          ...state,
          getProductSuccess: true,
          getProductList: action.payload.data,
        };
      }
      case "GET_PRODUCT_FAILURE": {
        return {
          ...state,
          getProductFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PRODUCT": {
        return {
          ...state,
          getProductSuccess: false,
          getProductFailure: false,
          getProductList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PRODUCT_SUCCESS": {             
        return {
          ...state,
          createProductSuccess: true,
          createProductData: action.payload.data,
        };
      }
      case "CREATE_PRODUCT_FAILURE": {
        return {
          ...state,
          createProductFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PRODUCT": {
        return {
          ...state,
          createProductSuccess: false,
          createProductFailure: false,
          createProductData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PRODUCT_SUCCESS": {             
        return {
          ...state,
          updateProductSuccess: true,
          updateProductData: action.payload.data,
        };
      }
      case "UPDATE_PRODUCT_FAILURE": {
        return {
          ...state,
          updateProductFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PRODUCT": {
        return {
          ...state,
          updateProductSuccess: false,
          updateProductFailure: false,
          updateProductData: false,
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
  
  export default ProductReducer
  
  