const initialState = {
    pagesList: []  
  }
  
  const PagesReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_PAGES_SUCCESS": {             
        return {
          ...state,
          getPagesSuccess: true,
          getPagesList: action.payload.data,
        };
      }
      case "GET_PAGES_FAILURE": {
        return {
          ...state,
          getPagesFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_PAGES": {
        return {
          ...state,
          getPagesSuccess: false,
          getPagesFailure: false,
          getPagesList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_PAGES_SUCCESS": {             
        return {
          ...state,
          createPagesSuccess: true,
          createPagesData: action.payload.data,
        };
      }
      case "CREATE_PAGES_FAILURE": {
        return {
          ...state,
          createPagesFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_PAGES": {
        return {
          ...state,
          createPagesSuccess: false,
          createPagesFailure: false,
          createPagesData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_PAGES_SUCCESS": {             
        return {
          ...state,
          updatePagesSuccess: true,
          updatePagesData: action.payload.data,
        };
      }
      case "UPDATE_PAGES_FAILURE": {
        return {
          ...state,
          updatePagesFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_PAGES": {
        return {
          ...state,
          updatePagesSuccess: false,
          updatePagesFailure: false,
          updatePagesData: false,
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
  
  export default PagesReducer
  
  