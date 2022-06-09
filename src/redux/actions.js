import { 
  ADD_ITEM,
  CLR_BASKET, 
  DECREMENT_STOCK, 
  DEL_POS, 
  SET_AUTHED, 
  SET_BEERS, 
  SET_ERROR, 
  SET_MSG, 
  SET_STOCK,
  BEER_DOWN, 
  INCREMENT_STOCK
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

export const incrementByAmount = (item) => {
  return {
    type: INCREMENT_STOCK,
    payload: item
  }
}
  
export const setStock = (stock) => {
  return {
    type: SET_STOCK,
    payload: stock
  }
}

export const setBeers = (beers) => {
  return {
    type: SET_BEERS,
    payload: beers
  }
}

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
  }
}

export const beerDown = (item) => {
  return {
    type: BEER_DOWN,
    payload: item
  }
}

export const delPos = (item) => {
  return {
    type: DEL_POS,
    payload: item
  }
}

export const clearBasket = (emptyBasket) => {
  return {
    type: CLR_BASKET,
    payload: emptyBasket
  }
}

export const setError = (bool) => {
  return {
    type: SET_ERROR,
    payload: bool
  }
}

export const setMessage = (text) => {
  return {
    type: SET_MSG,
    payload: text
  }
}