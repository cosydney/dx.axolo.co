import { User } from './userReducer'
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

let initialState = {
  loading: true,
  error: false,
  members: [],
}

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setData: (state, action) => {
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
    builder.addCase(User.actions.logout, (_) => initialState)
  },
})

const getOrganization = (state) => state.organization

export const Organization = {
  actions: organizationSlice.actions,
  selectors: { getOrganization },
}
