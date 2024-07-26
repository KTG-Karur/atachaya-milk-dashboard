const initialState = {
    feedEntryList: []  
  }
  
  const FeedEntryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_FEED_ENTRY_SUCCESS": {             
        return {
          ...state,
          getFeedEntrySuccess: true,
          getFeedEntryList: action.payload.data,
        };
      }
      case "GET_FEED_ENTRY_FAILURE": {
        return {
          ...state,
          getFeedEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_FEED_ENTRY": {
        return {
          ...state,
          getFeedEntrySuccess: false,
          getFeedEntryFailure: false,
          getFeedEntryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_FEED_ENTRY_SUCCESS": {             
        return {
          ...state,
          createFeedEntrySuccess: true,
          createFeedEntryData: action.payload.data,
        };
      }
      case "CREATE_FEED_ENTRY_FAILURE": {
        return {
          ...state,
          createFeedEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_FEED_ENTRY": {
        return {
          ...state,
          createFeedEntrySuccess: false,
          createFeedEntryFailure: false,
          createFeedEntryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_FEED_ENTRY_SUCCESS": {             
        return {
          ...state,
          updateFeedEntrySuccess: true,
          updateFeedEntryData: action.payload.data,
        };
      }
      case "UPDATE_FEED_ENTRY_FAILURE": {
        return {
          ...state,
          updateFeedEntryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_FEED_ENTRY": {
        return {
          ...state,
          updateFeedEntrySuccess: false,
          updateFeedEntryFailure: false,
          updateFeedEntryData: false,
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
  
  export default FeedEntryReducer
  
  