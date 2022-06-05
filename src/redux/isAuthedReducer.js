import { SET_AUTHED } from "./types";

const initialState = false;

export const isAuthedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHED:
      return action.payload;
    default:
      return state
  }
}