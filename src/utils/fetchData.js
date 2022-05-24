import axios from "axios";
import { config } from "../configs";

export const getData = (url, params) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return axios.get(`${config.api_host}/${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postData = async (url, payload, formData) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${config.api_host}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': formData ? 'multipart/form-data' : 'application/json'
    },
  });
};

export const putData = async (url, payload) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(`${config.api_host}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchData = async (url, payload) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.patch(`${config.api_host}/${url}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteData = async (url) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.delete(`${config.api_host}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
