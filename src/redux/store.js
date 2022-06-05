import { configureStore } from "@reduxjs/toolkit";
import basketReducer from '../redux/basketSlice'
import stockReducer from '../redux/stockSlice'
import isAuthedReducer from '../redux/isAuthedSlice'

export default configureStore({
  reducer: {
    basket: basketReducer,
    stock: stockReducer,
    isAuthed: isAuthedReducer
  },
});