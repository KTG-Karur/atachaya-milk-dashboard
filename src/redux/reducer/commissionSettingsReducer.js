const initialState = {
    commissionSettingsList: []  
  }
  
  const CommissionSettingsReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_COMMISSION_SETTINGS_SUCCESS": {             
        return {
          ...state,
          getCommissionSettingsSuccess: true,
          getCommissionSettingsList: action.payload.data,
        };
      }
      case "GET_COMMISSION_SETTINGS_FAILURE": {
        return {
          ...state,
          getCommissionSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_COMMISSION_SETTINGS": {
        return {
          ...state,
          getCommissionSettingsSuccess: false,
          getCommissionSettingsFailure: false,
          getCommissionSettingsList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_COMMISSION_SETTINGS_SUCCESS": {             
        return {
          ...state,
          createCommissionSettingsSuccess: true,
          createCommissionSettingsData: action.payload.data,
        };
      }
      case "CREATE_COMMISSION_SETTINGS_FAILURE": {
        return {
          ...state,
          createCommissionSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_COMMISSION_SETTINGS": {
        return {
          ...state,
          createCommissionSettingsSuccess: false,
          createCommissionSettingsFailure: false,
          createCommissionSettingsData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_COMMISSION_SETTINGS_SUCCESS": {             
        return {
          ...state,
          updateCommissionSettingsSuccess: true,
          updateCommissionSettingsData: action.payload.data,
        };
      }
      case "UPDATE_COMMISSION_SETTINGS_FAILURE": {
        return {
          ...state,
          updateCommissionSettingsFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_COMMISSION_SETTINGS": {
        return {
          ...state,
          updateCommissionSettingsSuccess: false,
          updateCommissionSettingsFailure: false,
          updateCommissionSettingsData: false,
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
  
  export default CommissionSettingsReducer
  
  