const initialState = {
    dashboradList: []  
  }
  
  const DashboardReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_DASHBOARD_SUCCESS": {             
        return {
          ...state,
          getDashboardSuccess: true,
          getDashboardList: action.payload.data,
        };
      }
      case "GET_DASHBOARD_FAILURE": {
        return {
          ...state,
          getDashboardFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_DASHBOARD": {
        return {
          ...state,
          getDashboardSuccess: false,
          getDashboardFailure: false,
          getDashboardList: [],
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
  
  export default DashboardReducer
  
  