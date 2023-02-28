import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

let initialState = {
  loading: true,
  error: false,
  members: [],
  setting: {},
}

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    updateOrganization: (state, action) => {
      return {
        ...state,
        ...action.payload,
        error: false,
        loading: false,
        lastUpdated: moment().format(),
      }
    },
  },
  extraReducers: (builder) => {
    console.log('here')
    builder.addCase(User.actions.logout, (_) => initialState)
  },
})

export const { updateOrganization } = organizationSlice.actions

const getOrganization = (state) => state.organization

export const Organization = {
  actions: organizationSlice.actions,
  selectors: { getOrganization },
}
