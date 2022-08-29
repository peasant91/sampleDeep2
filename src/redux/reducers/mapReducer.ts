import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";

export type MapState = {
  searchHistories: {
    data: GooglePlaceData;
    detail: GooglePlaceDetail | null
  }[];
}

const initialState: MapState = {
  searchHistories: [],
};

export const mapReducer = (state: MapState = initialState, action: any) => {
  switch (action.type) {
    case "ADD_SEARCH_MAP_HISTORY":
      return {
        ...state,
        searchHistories: [action.payload.search_history, ...state.searchHistories],
      };
    case "CLEAR_SEARCH_MAP_HISTORY":
      return {
        ...state,
        searchHistories: [],
      };
    case "DELETE_SEARCH_MAP_HISTORY":
      return {
        ...state,
        searchHistories: state.searchHistories.filter((searchHistory) => searchHistory.data.place_id !== action.payload.place_id),
      };
    default:
      return state;
  }
};
