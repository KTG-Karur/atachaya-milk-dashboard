const initialState = {
    commissionTypeList: []  
  }
  
  const CommissionTypeReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_COMMISSION_TYPE_SUCCESS": {             
        return {
          ...state,
          getCommissionTypeSuccess: true,
          getCommissionTypeList: action.payload.data,
        };
      }
      case "GET_COMMISSION_TYPE_FAILURE": {
        return {
          ...state,
          getCommissionTypeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_COMMISSION_TYPE": {
        return {
          ...state,
          getCommissionTypeSuccess: false,
          getCommissionTypeFailure: false,
          getCommissionTypeList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_COMMISSION_TYPE_SUCCESS": {             
        return {
          ...state,
          createCommissionTypeSuccess: true,
          createCommissionTypeData: action.payload.data,
        };
      }
      case "CREATE_COMMISSION_TYPE_FAILURE": {
        return {
          ...state,
          createCommissionTypeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_COMMISSION_TYPE": {
        return {
          ...state,
          createCommissionTypeSuccess: false,
          createCommissionTypeFailure: false,
          createCommissionTypeData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_COMMISSION_TYPE_SUCCESS": {             
        return {
          ...state,
          updateCommissionTypeSuccess: true,
          updateCommissionTypeData: action.payload.data,
        };
      }
      case "UPDATE_COMMISSION_TYPE_FAILURE": {
        return {
          ...state,
          updateCommissionTypeFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_COMMISSION_TYPE": {
        return {
          ...state,
          updateCommissionTypeSuccess: false,
          updateCommissionTypeFailure: false,
          updateCommissionTypeData: false,
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
  
  export default CommissionTypeReducer
  
  