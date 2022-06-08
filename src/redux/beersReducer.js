import { SET_BEERS } from "./types";

const initialState = [];

export const beersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.payload
    default:
      return state
  }
}