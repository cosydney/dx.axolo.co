import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  list: [],
}

export const sequenceSlice = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    updateSequence: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(User.actions.logout, (_) => initialState)
  },
})

export const { updateSequence } = sequenceSlice.actions

const getSequence = (state) => state.sequence

export const Sequence = {
  actions: sequenceSlice.actions,
  selectors: { getSequence },
}
