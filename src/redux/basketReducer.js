import { ADD_ITEM, ADD_TOTAL } from "./types";

const initialState = {
  amount: 0,
  total: 0,
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, amount: state.amount + action.payload}
    case ADD_TOTAL:
      return {...state, total: Math.round((state.total + action.payload) * 100 + Number.EPSILON) / 100}
    default:
      return state
  }
}