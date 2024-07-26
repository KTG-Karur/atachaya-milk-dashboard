const initialState = {
    roleList: []  
  }
  
  const RoleReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_ROLE_SUCCESS": {             
        return {
          ...state,
          getRoleSuccess: true,
          getRoleList: action.payload.data,
        };
      }
      case "GET_ROLE_FAILURE": {
        return {
          ...state,
          getRoleFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_ROLE": {
        return {
          ...state,
          getRoleSuccess: false,
          getRoleFailure: false,
          getRoleList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_ROLE_SUCCESS": {             
        return {
          ...state,
          createRoleSuccess: true,
          createRoleData: action.payload.data,
        };
      }
      case "CREATE_ROLE_FAILURE": {
        return {
          ...state,
          createRoleFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_ROLE": {
        return {
          ...state,
          createRoleSuccess: false,
          createRoleFailure: false,
          createRoleData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_ROLE_SUCCESS": {             
        return {
          ...state,
          updateRoleSuccess: true,
          updateRoleData: action.payload.data,
        };
      }
      case "UPDATE_ROLE_FAILURE": {
        return {
          ...state,
          updateRoleFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_ROLE": {
        return {
          ...state,
          updateRoleSuccess: false,
          updateRoleFailure: false,
          updateRoleData: false,
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
  
  export default RoleReducer
  
  