import { 
  ADD_ITEM,
  ADD_TOTAL, 
  DECREMENT_STOCK, 
  SET_AUTHED, 
  SET_STOCK 
} from "./types"

export const setIsAuthed = (bool) => {
  return {
    type: SET_AUTHED,
    payload: bool
  }
}

export const decrementByAmount = (item) => {
  return {
    type: DECREMENT_STOCK,
    payload: item
  }
}
  
export const setStock = (stock) => {
  return {
    type: SET_STOCK,
    payload: stock
  }
}

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
  }
}

export const addTotal = (num) => {
  return {
    type: ADD_TOTAL,
    payload: num
  }
}
