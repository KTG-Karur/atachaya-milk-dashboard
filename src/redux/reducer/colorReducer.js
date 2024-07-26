const initialState = {
    colorList: []  
  }
  
  const ColorReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_COLOR_SUCCESS": {             
        return {
          ...state,
          getColorSuccess: true,
          getColorList: action.payload.data,
        };
      }
      case "GET_COLOR_FAILURE": {
        return {
          ...state,
          getColorFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_COLOR": {
        return {
          ...state,
          getColorSuccess: false,
          getColorFailure: false,
          getColorList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_COLOR_SUCCESS": {             
        return {
          ...state,
          createColorSuccess: true,
          createColorData: action.payload.data,
        };
      }
      case "CREATE_COLOR_FAILURE": {
        return {
          ...state,
          createColorFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_COLOR": {
        return {
          ...state,
          createColorSuccess: false,
          createColorFailure: false,
          createColorData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_COLOR_SUCCESS": {             
        return {
          ...state,
          updateColorSuccess: true,
          updateColorData: action.payload.data,
        };
      }
      case "UPDATE_COLOR_FAILURE": {
        return {
          ...state,
          updateColorFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_COLOR": {
        return {
          ...state,
          updateColorSuccess: false,
          updateColorFailure: false,
          updateColorData: false,
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
  
  export default ColorReducer
  
  