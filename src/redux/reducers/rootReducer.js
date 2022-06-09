import { combineReducers } from 'redux';
import { basketReducer } from './basketReducer';
import { beersReducer } from './beersReducer';
import { isAuthedReducer } from './isAuthedReducer';
import { serverReducer } from './serverReducer';
import { stockReducer } from './stockReducer';


export const rootReducer = combineReducers({
  isAuthed: isAuthedReducer,
  basket: basketReducer,
  stock: stockReducer,
  beers: beersReducer,
  server: serverReducer,
})