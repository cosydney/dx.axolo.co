import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  launchSequenceDay: 'tuesday',
  launchSequenceTime: '10:00',
  followUpReminderPeriodDays: 3,
  organization: null,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateSetting: (state, action) => {
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

export const { updateSetting } = settingSlice.actions

const getSetting = (state) => state.setting

export const Setting = {
  actions: settingSlice.actions,
  selectors: { getSetting },
}
