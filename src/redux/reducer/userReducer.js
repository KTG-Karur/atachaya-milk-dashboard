const initialState = {
    userList: []  
  }
  
  const UserReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_USER_SUCCESS": {             
        return {
          ...state,
          getUserSuccess: true,
          getUserList: action.payload.data,
        };
      }
      case "GET_USER_FAILURE": {
        return {
          ...state,
          getUserFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_USER": {
        return {
          ...state,
          getUserSuccess: false,
          getUserFailure: false,
          getUserList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_USER_SUCCESS": {             
        return {
          ...state,
          createUserSuccess: true,
          createUserData: action.payload.data,
        };
      }
      case "CREATE_USER_FAILURE": {
        return {
          ...state,
          createUserFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_USER": {
        return {
          ...state,
          createUserSuccess: false,
          createUserFailure: false,
          createUserData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_USER_SUCCESS": {             
        return {
          ...state,
          updateUserSuccess: true,
          updateUserData: action.payload.data,
        };
      }
      case "UPDATE_USER_FAILURE": {
        return {
          ...state,
          updateUserFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_USER": {
        return {
          ...state,
          updateUserSuccess: false,
          updateUserFailure: false,
          updateUserData: false,
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
  
  export default UserReducer
  
  