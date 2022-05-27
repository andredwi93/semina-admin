import debounce from "debounce-promise";
import { getData } from "../../utils/fetchData";
import { clearNotif } from "../notif/actions";
import {
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
  ERROR_FETCHING_EVENTS,
  SET_KEYWORD,
  SET_CATEGORY,
  SET_SPEAKER,
} from "./constant";

let debounceFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS,
  };
};

export const successFetchingEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS,
    events,
  };
};

export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS,
  };
};

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvents());
    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let params = {
        keyword: getState().events.keyword,
        category: getState().events?.category?.value || "",
        speaker: getState().events?.speaker?.value || "",
      };

      let res = await debounceFetchEvents("api/v1/events", params);

      res.data.data.forEach(
        (ele) => (
          (ele.categoryName = ele?.category?.name ?? ""),
          (ele.speakerName = ele?.speaker?.name ?? "-")
        )
      );

      dispatch(
        successFetchingEvents({
          events: res.data.data,
        })
      );
    } catch (err) {
      dispatch(errorFetchingEvents());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const setSpeaker = (speaker) => {
  return {
    type: SET_SPEAKER,
    speaker,
  };
};
