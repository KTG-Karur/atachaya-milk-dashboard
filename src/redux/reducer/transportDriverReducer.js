const initialState = {
    transportDriverList: []  
  }
  
  const TransportDriverReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_TRANSPORT_DRIVER_SUCCESS": {             
        return {
          ...state,
          getTransportDriverSuccess: true,
          getTransportDriverList: action.payload.data,
        };
      }
      case "GET_TRANSPORT_DRIVER_FAILURE": {
        return {
          ...state,
          getTransportDriverFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_TRANSPORT_DRIVER": {
        return {
          ...state,
          getTransportDriverSuccess: false,
          getTransportDriverFailure: false,
          getTransportDriverList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_TRANSPORT_DRIVER_SUCCESS": {             
        return {
          ...state,
          createTransportDriverSuccess: true,
          createTransportDriverData: action.payload.data,
        };
      }
      case "CREATE_TRANSPORT_DRIVER_FAILURE": {
        return {
          ...state,
          createTransportDriverFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_TRANSPORT_DRIVER": {
        return {
          ...state,
          createTransportDriverSuccess: false,
          createTransportDriverFailure: false,
          createTransportDriverData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_TRANSPORT_DRIVER_SUCCESS": {             
        return {
          ...state,
          updateTransportDriverSuccess: true,
          updateTransportDriverData: action.payload.data,
        };
      }
      case "UPDATE_TRANSPORT_DRIVER_FAILURE": {
        return {
          ...state,
          updateTransportDriverFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_TRANSPORT_DRIVER": {
        return {
          ...state,
          updateTransportDriverSuccess: false,
          updateTransportDriverFailure: false,
          updateTransportDriverData: false,
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
  
  export default TransportDriverReducer
  
  