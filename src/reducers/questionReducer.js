import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  list: [],
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    updateQuestion: (state, action) => {
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

export const { updateQuestion } = questionSlice.actions

const getQuestion = (state) => state.question

export const Question = {
  actions: questionSlice.actions,
  selectors: { getQuestion },
}
