const initialState = {
    centerList: []  
  }
  
  const CenterReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_CENTER_SUCCESS": {             
        return {
          ...state,
          getCenterSuccess: true,
          getCenterList: action.payload.data,
        };
      }
      case "GET_CENTER_FAILURE": {
        return {
          ...state,
          getCenterFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_CENTER": {
        return {
          ...state,
          getCenterSuccess: false,
          getCenterFailure: false,
          getCenterList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_CENTER_SUCCESS": {             
        return {
          ...state,
          createCenterSuccess: true,
          createCenterData: action.payload.data,
        };
      }
      case "CREATE_CENTER_FAILURE": {
        return {
          ...state,
          createCenterFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_CENTER": {
        return {
          ...state,
          createCenterSuccess: false,
          createCenterFailure: false,
          createCenterData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_CENTER_SUCCESS": {             
        return {
          ...state,
          updateCenterSuccess: true,
          updateCenterData: action.payload.data,
        };
      }
      case "UPDATE_CENTER_FAILURE": {
        return {
          ...state,
          updateCenterFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_CENTER": {
        return {
          ...state,
          updateCenterSuccess: false,
          updateCenterFailure: false,
          updateCenterData: false,
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
  
  export default CenterReducer
  
  