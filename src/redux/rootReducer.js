import { combineReducers } from 'redux';
import { basketReducer } from './basketReducer';
import { isAuthedReducer } from './isAuthedReducer';
import { stockReducer } from './stockReducer';

export const rootReducer = combineReducers({
  isAuthed: isAuthedReducer,
  basket: basketReducer,
  stock: stockReducer
})