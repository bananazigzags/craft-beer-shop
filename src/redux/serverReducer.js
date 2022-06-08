import { SET_ERROR, SET_MSG } from "./types";

const initialState = {
  error: false,
  msg: ""
};

export const serverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {...state, error: action.payload}
    case SET_MSG:
      return {...state, msg: action.payload}
    default:
      return state
  }
}