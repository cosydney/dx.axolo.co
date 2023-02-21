import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  questions: [],
  step: 0,
}

export const currentSequenceSlice = createSlice({
  name: 'currentSequence',
  initialState,
  reducers: {
    updateCurrentSequence: (state, action) => {
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

export const { updateCurrentSequence } = currentSequenceSlice.actions

const getCurrentSequence = (state) => state.currentSequence

export const CurrentSequence = {
  actions: currentSequenceSlice.actions,
  selectors: { getCurrentSequence },
}
