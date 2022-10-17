import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  darkMode: true,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setData: (state, action) => {
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

export const { setData } = settingSlice.actions

const getSetting = (state) => state.setting

export const Setting = {
  actions: settingSlice.actions,
  selectors: { getSetting },
}
