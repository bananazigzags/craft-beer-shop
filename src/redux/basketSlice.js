import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    amount: 0,
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      state.amount += action.payload
    },
    addTotal: (state, action) => {
      state.total = Math.round((state.total + action.payload) * 100 + Number.EPSILON) / 100
    }
  }
})

export const { addItem, addTotal } = basketSlice.actions
export const selectBasket = (state) => state.basket

export default basketSlice.reducer