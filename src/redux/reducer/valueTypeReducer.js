const initialState = {
    valueTypeList: []  
  }
  
  const ValueTypeReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_VALUE_TYPE_SUCCESS": {             
        return {
          ...state,
          getValueTypeSuccess: true,
          getValueTypeList: action.payload.data,
        };
      }
      case "GET_VALUE_TYPE_FAILURE": {
        return {
          ...state,
          getValueTypeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_VALUE_TYPE": {
        return {
          ...state,
          getValueTypeSuccess: false,
          getValueTypeFailure: false,
          getValueTypeList: [],
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
  
  export default ValueTypeReducer
  
  