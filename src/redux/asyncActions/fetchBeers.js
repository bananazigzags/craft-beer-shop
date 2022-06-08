import { beersUrl } from "../../util/constants";
import { setBeers, setMessage, setStock } from "../actions";
import { setError } from "../actions";

export const fetchBeers = () => {
  return (dispatch) => {
    fetch(`${beersUrl}?page=1&per_page=24`)
    .then(response => {
      if (!response.ok) {
        dispatch(setError(true));
      } else {
        return response.json()
      }
    })
    .then(data => {
      dispatch(setBeers(data));
      const newStock = {};
      data.forEach(beer => { 
        newStock[beer.id] = Math.floor(beer.srm) || 0
      })
      dispatch(setStock(newStock));
    })
    .catch(e => {
      dispatch(setError(true))
      dispatch(setMessage(e.toString()))
    })
  }
}