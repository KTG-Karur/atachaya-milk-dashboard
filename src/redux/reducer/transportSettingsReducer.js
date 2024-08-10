const initialState = {
    transportSettingsList: []  
  }
  
  const TransportSettingsReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_TRANSPORT_SETTINGS_SUCCESS": {             
        return {
          ...state,
          getTransportSettingsSuccess: true,
          getTransportSettingsList: action.payload.data,
        };
      }
      case "GET_TRANSPORT_SETTINGS_FAILURE": {
        return {
          ...state,
          getTransportSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_TRANSPORT_SETTINGS": {
        return {
          ...state,
          getTransportSettingsSuccess: false,
          getTransportSettingsFailure: false,
          getTransportSettingsList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_TRANSPORT_SETTINGS_SUCCESS": {             
        return {
          ...state,
          createTransportSettingsSuccess: true,
          createTransportSettingsData: action.payload.data,
        };
      }
      case "CREATE_TRANSPORT_SETTINGS_FAILURE": {
        return {
          ...state,
          createTransportSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_TRANSPORT_SETTINGS": {
        return {
          ...state,
          createTransportSettingsSuccess: false,
          createTransportSettingsFailure: false,
          createTransportSettingsData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_TRANSPORT_SETTINGS_SUCCESS": {             
        return {
          ...state,
          updateTransportSettingsSuccess: true,
          updateTransportSettingsData: action.payload.data,
        };
      }
      case "UPDATE_TRANSPORT_SETTINGS_FAILURE": {
        return {
          ...state,
          updateTransportSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_TRANSPORT_SETTINGS": {
        return {
          ...state,
          updateTransportSettingsSuccess: false,
          updateTransportSettingsFailure: false,
          updateTransportSettingsData: false,
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
  
  export default TransportSettingsReducer
  
  