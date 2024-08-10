const initialState = {
    feedEntryHistoryList: []  
  }
  
  const FeedEntryHistoryReducer = function (state = initialState, action) {  
    switch (action.type) {
      case "GET_FEED_ENTRY_HISTORY_SUCCESS": {             
        return {
          ...state,
          getFeedEntryHistorySuccess: true,
          getFeedEntryHistoryList: action.payload.data,
        };
      }
      case "GET_FEED_ENTRY_HISTORY_FAILURE": {
        return {
          ...state,
          getFeedEntryHistoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_GET_FEED_ENTRY_HISTORY": {
        return {
          ...state,
          getFeedEntryHistorySuccess: false,
          getFeedEntryHistoryFailure: false,
          getFeedEntryHistoryList: [],
          errorMessage: false
        };
      }
      
      case "CREATE_FEED_ENTRY_HISTORY_SUCCESS": {             
        return {
          ...state,
          createFeedEntryHistorySuccess: true,
          createFeedEntryHistoryData: action.payload.data,
        };
      }
      case "CREATE_FEED_ENTRY_HISTORY_FAILURE": {
        return {
          ...state,
          createFeedEntryHistoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_CREATE_FEED_ENTRY_HISTORY": {
        return {
          ...state,
          createFeedEntryHistorySuccess: false,
          createFeedEntryHistoryFailure: false,
          createFeedEntryHistoryData: false,
          errorMessage: false         
        };
      }
  
      case "UPDATE_FEED_ENTRY_HISTORY_SUCCESS": {             
        return {
          ...state,
          updateFeedEntryHistorySuccess: true,
          updateFeedEntryHistoryData: action.payload.data,
        };
      }
      case "UPDATE_FEED_ENTRY_HISTORY_FAILURE": {
        return {
          ...state,
          updateFeedEntryHistoryFailure: true,
          errorMessage: action.errorMessage
        };
      }
      case "RESET_UPDATE_FEED_ENTRY_HISTORY": {
        return {
          ...state,
          updateFeedEntryHistorySuccess: false,
          updateFeedEntryHistoryFailure: false,
          updateFeedEntryHistoryData: false,
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
  
  export default FeedEntryHistoryReducer
  
  