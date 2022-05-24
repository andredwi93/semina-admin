import {
  START_FETCHING_SPEAKERS,
  SUCCESS_FETCHING_SPEAKERS,
  ERROR_FETCHING_SPEAKERS,
  SET_KEYWORD,
} from "./constant";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statusList.idle,
  data: [],
  keyword: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_SPEAKERS:
      return { ...state, status: statusList.process };
    case SUCCESS_FETCHING_SPEAKERS:
      return {
        ...state,
        data: action.speakers,
        status: statusList.success,
      };
    case ERROR_FETCHING_SPEAKERS:
      return { ...state, status: statusList.error };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    default:
      return state;
  }
}
