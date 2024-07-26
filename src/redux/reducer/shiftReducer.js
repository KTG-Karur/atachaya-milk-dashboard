const initialState = {
    shiftList: []  
  }
  
  const ShiftReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_SHIFT_SUCCESS": {             
        return {
          ...state,
          getShiftSuccess: true,
          getShiftList: action.payload.data,
        };
      }
      case "GET_SHIFT_FAILURE": {
        return {
          ...state,
          getShiftFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_SHIFT": {
        return {
          ...state,
          getShiftSuccess: false,
          getShiftFailure: false,
          getShiftList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_SHIFT_SUCCESS": {             
        return {
          ...state,
          createShiftSuccess: true,
          createShiftData: action.payload.data,
        };
      }
      case "CREATE_SHIFT_FAILURE": {
        return {
          ...state,
          createShiftFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_SHIFT": {
        return {
          ...state,
          createShiftSuccess: false,
          createShiftFailure: false,
          createShiftData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_SHIFT_SUCCESS": {             
        return {
          ...state,
          updateShiftSuccess: true,
          updateShiftData: action.payload.data,
        };
      }
      case "UPDATE_SHIFT_FAILURE": {
        return {
          ...state,
          updateShiftFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_SHIFT": {
        return {
          ...state,
          updateShiftSuccess: false,
          updateShiftFailure: false,
          updateShiftData: false,
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
  
  export default ShiftReducer
  
  