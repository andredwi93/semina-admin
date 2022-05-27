import debounce from "debounce-promise";
import { getData } from "../../utils/fetchData";
import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_SPEAKERS,
  SUCCESS_FETCHING_LISTS_SPEAKERS,
  ERROR_FETCHING_LISTS_SPEAKERS,
} from "./constant";

let debounceFetchCategories = debounce(getData, 1000);
let debounceFetchSpeakers = debounce(getData, 1000);

// redux list categories
export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_LISTS_CATEGORIES,
  };
};

export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_CATEGORIES,
    categories,
  };
};

export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_LISTS_CATEGORIES,
  };
};

export const fetchListCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories());
    try {
      let res = await debounceFetchCategories("api/v1/categories");
      
      let _temp = [];

      res.data.data.forEach((ele) => {
        _temp.push({
          value: ele._id,
          label: ele.name,
          target: { value: ele._id, name: "category" },
        });
      });

      dispatch(
        successFetchingCategories({
          categories: _temp,
        })
      );
    } catch (err) {
      dispatch(errorFetchingCategories());
    }
  };
};

// redux list speakers
export const startFetchingSpeakers = () => {
  return {
    type: START_FETCHING_LISTS_SPEAKERS,
  };
};

export const successFetchingSpeakers = ({ speakers }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_SPEAKERS,
    speakers,
  };
};

export const errorFetchingSpeakers = () => {
  return {
    type: ERROR_FETCHING_LISTS_SPEAKERS,
  };
};

export const fetchListSpeakers = () => {
  return async (dispatch) => {
    dispatch(startFetchingSpeakers());
    try {
      let res = await debounceFetchSpeakers("api/v1/speakers");
      
      let _temp = [];

      res.data.data.forEach((ele) => {
        _temp.push({
          value: ele._id,
          label: ele.name,
          target: { value: ele._id, name: "speaker" },
        });
      });

      dispatch(
        successFetchingSpeakers({
          speakers: _temp,
        })
      );
    } catch (err) {
      dispatch(errorFetchingSpeakers());
    }
  };
};
