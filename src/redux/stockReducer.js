import { DECREMENT_STOCK, SET_STOCK } from "./types";

const initialState = {};

export const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case DECREMENT_STOCK:
      return { ...state, [action.payload.id]: state[action.payload.id] - action.payload.amount}
    case SET_STOCK:
      return action.payload
    default:
      return state
  }
}