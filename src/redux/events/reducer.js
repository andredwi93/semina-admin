import {
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
  ERROR_FETCHING_EVENTS,
  SET_KEYWORD,
  SET_CATEGORY,
  SET_SPEAKER,
} from "./constant";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  category: "",
  speaker: "",
  status: statusList.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_EVENTS:
      return { ...state, status: statusList.process };
    case SUCCESS_FETCHING_EVENTS:
      return {
        ...state,
        data: action.events,
        status: statusList.success,
      };
    case ERROR_FETCHING_EVENTS:
      return { ...state, status: statusList.error };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case SET_SPEAKER:
      return {
        ...state,
        speaker: action.speaker,
      };
    default:
      return state;
  }
}
