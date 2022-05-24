import { SET_NOTIF, CLEAR_NOTIF } from "./constant";

export const setNotif = (status, typeNotif, message) => {
  return {
    type: SET_NOTIF,
    status,
    typeNotif,
    message
  }
}

export const clearNotif = () => {
  return {
    type: CLEAR_NOTIF
  }
}