import { createSlice } from '@reduxjs/toolkit'

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {},
  reducers: {
    decrementByAmount: (state, action) => {
      state[action.payload.id] -= action.payload.amount
    },
    setStock: (state, action) => {
      return action.payload
    }
  }
})

export const { decrementByAmount, setStock } = stockSlice.actions
export const selectStock = (state) => state.stock

export default stockSlice.reducer