import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  list: [],
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    updateMember: (state, action) => {
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

export const { updateMember } = memberSlice.actions

const getMember = (state) => state.member

export const Member = {
  actions: memberSlice.actions,
  selectors: { getMember },
}
