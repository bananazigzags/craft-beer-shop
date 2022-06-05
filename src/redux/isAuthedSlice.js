import { createSlice } from '@reduxjs/toolkit'

export const isAuthedSlice = createSlice({
  name: 'isAuthed',
  initialState: false,
  reducers: {
    setIsAuthed: (state, action) => {
      return action.payload
    }
  }
})

export const { setIsAuthed } = isAuthedSlice.actions
export const selectIsAuthed = (state) => state.isAuthed

export default isAuthedSlice.reducer