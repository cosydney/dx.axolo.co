import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  error: false,
  loading: true,
  id: '',
  username: '',
  name: '',
  avatarUrl: '',
  jwt: null,
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    updateUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => initialState,
  },
})

export const { logout, setUser, setError, updateUser } = slice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user
export const selectJWT = (state) => state.user.jwt
export const selectAnalyticsJWT = (state) => state.user.veloframeJwt
export const selectIsAdminUser = (state) => state.user.isAdminUser

export const User = {
  actions: slice.actions,
  selectors: { selectUser, selectJWT, selectAnalyticsJWT, selectIsAdminUser },
}

export default slice.reducer
