const initialState = {
    rolePermissionList: []  
  }
  
  const RolePermissionReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_ROLE_PERMISSION_SUCCESS": {             
        return {
          ...state,
          getRolePermissionSuccess: true,
          getRolePermissionList: action.payload.data,
        };
      }
      case "GET_ROLE_PERMISSION_FAILURE": {
        return {
          ...state,
          getRolePermissionFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_ROLE_PERMISSION": {
        return {
          ...state,
          getRolePermissionSuccess: false,
          getRolePermissionFailure: false,
          getRolePermissionList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_ROLE_PERMISSION_SUCCESS": {             
        return {
          ...state,
          createRolePermissionSuccess: true,
          createRolePermissionData: action.payload.data,
        };
      }
      case "CREATE_ROLE_PERMISSION_FAILURE": {
        return {
          ...state,
          createRolePermissionFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_ROLE_PERMISSION": {
        return {
          ...state,
          createRolePermissionSuccess: false,
          createRolePermissionFailure: false,
          createRolePermissionData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_ROLE_PERMISSION_SUCCESS": {             
        return {
          ...state,
          updateRolePermissionSuccess: true,
          updateRolePermissionData: action.payload.data,
        };
      }
      case "UPDATE_ROLE_PERMISSION_FAILURE": {
        return {
          ...state,
          updateRolePermissionFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_ROLE_PERMISSION": {
        return {
          ...state,
          updateRolePermissionSuccess: false,
          updateRolePermissionFailure: false,
          updateRolePermissionData: false,
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
  
  export default RolePermissionReducer
  
  