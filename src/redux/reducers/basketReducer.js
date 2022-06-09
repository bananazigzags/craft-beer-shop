import { ADD_ITEM, CLR_BASKET, DEL_POS, BEER_DOWN } from "../types";

export const initialState = {
  items: {},
};

export const basketReducer = (state = initialState, action) => {
  const newState = { ...state};
  switch (action.type) {
    case ADD_ITEM:
      if (state.items[action.payload.id]) {
        newState.items[action.payload.id] = {
          ...newState.items[action.payload.id],
          amount: state.items[action.payload.id].amount + action.payload.amount,
        };
      } else {
        newState.items[action.payload.id] = {
          name: action.payload.name,
          price: action.payload.price || 4.5,
          amount: action.payload.amount,
        }
      }
      return newState;
    case DEL_POS:
      delete newState.items[action.payload.id]
      return newState;
    case CLR_BASKET:
      return {items: {}};
    case BEER_DOWN:
      newState.items[action.payload.id] = {
        ...newState.items[action.payload.id],
        amount: state.items[action.payload.id].amount - 1
      }
      if(newState.items[action.payload.id].amount === 0) {
        delete newState.items[action.payload.id];
      }
      return newState
    default:
      return state;
  }
}