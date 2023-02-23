import { createSlice } from '@reduxjs/toolkit'
import { User } from './userReducer'

let initialState = {
  step1: false,
  step2: false,
  step3: false,
  closed: false,
  finished: false,
}

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    updateOnboarding: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    extraReducers: (builder) => {
      builder.addCase(User.actions.logout, (_) => initialState)
    },
  },
})

export const { updateOnboarding } = onboardingSlice.actions

const getOnboarding = (state) => state.onboarding

export const OnboardingState = {
  actions: onboardingSlice.actions,
  selectors: { getOnboarding },
}
